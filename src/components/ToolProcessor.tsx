import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  Trash2, 
  RotateCw, 
  Download, 
  Share2, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ArrowLeft, 
  Lock, 
  Grid, 
  Move, 
  Sliders, 
  Copy, 
  Check, 
  FileCode,
  Layers,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TOOLS_DATA } from '../data/toolsData';
import { TOOL_SEO_DATA } from '../data/seoData';
import { RelatedTools } from './RelatedTools';
import { ToolFaqSection } from './ToolFaqSection';
import { CompressOptions, ImageToPdfOptions, ToolId, WatermarkOptions } from '../types';
import { useAuth } from '../context/AuthContext';
import { 
  mergePDFs, 
  splitPDF, 
  compressPDF, 
  convertImagesToPDF, 
  rotatePDFPages, 
  deletePDFPages, 
  rearrangePDFPages, 
  addWatermarkToPDF, 
  protectPDF, 
  renderPdfPageToDataUrl, 
  downloadFile 
} from '../lib/pdfEngine';

interface ToolProcessorProps {
  toolId: ToolId;
  onBackToGrid: () => void;
  onSelectTool?: (toolId: ToolId) => void;
}

interface LoadedPageThumbnail {
  pageIndex: number;
  dataUrl: string;
  rotation: number;
}

export const ToolProcessor: React.FC<ToolProcessorProps> = ({ toolId, onBackToGrid, onSelectTool }) => {
  const { logActivity, setUpgradeModalOpen } = useAuth();
  const toolMeta = TOOLS_DATA.find((t) => t.id === toolId) || TOOLS_DATA[0];
  const toolSeo = TOOL_SEO_DATA[toolId];

  // Uploaded Files state
  const [files, setFiles] = useState<File[]>([]);
  const [pageThumbnails, setPageThumbnails] = useState<LoadedPageThumbnail[]>([]);
  const [selectedPageIndices, setSelectedPageIndices] = useState<number[]>([]);
  
  // Processing States
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [processedResult, setProcessedResult] = useState<{
    data: Uint8Array | string;
    filename: string;
    mimeType: string;
    originalSize?: number;
    newSize?: number;
  } | null>(null);

  // Tool Specific Options
  const [compressQuality, setCompressQuality] = useState<'recommended' | 'extreme' | 'less'>('recommended');
  const [splitMode, setSplitMode] = useState<'range' | 'selected'>('range');
  const [splitRangeText, setSplitRangeText] = useState('1-3');
  const [watermarkConfig, setWatermarkConfig] = useState<WatermarkOptions>({
    text: 'CONFIDENTIAL',
    fontSize: 42,
    opacity: 0.35,
    rotation: 45,
    color: '#10B981',
    position: 'center',
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [imgToPdfOptions, setImgToPdfOptions] = useState<ImageToPdfOptions>({
    pageSize: 'A4',
    orientation: 'portrait',
    margin: 10,
  });

  // AI OCR States
  const [extractedOcrText, setExtractedOcrText] = useState('');
  const [aiSummary, setAiSummary] = useState('');
  const [copiedText, setCopiedText] = useState(false);

  // Ref for drag and drop
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clear states when tool changes
  useEffect(() => {
    setFiles([]);
    setPageThumbnails([]);
    setSelectedPageIndices([]);
    setProcessedResult(null);
    setErrorMessage('');
    setStatusMessage('');
    setExtractedOcrText('');
    setAiSummary('');
  }, [toolId]);

  // Load visual page thumbnails when single PDF file uploaded
  useEffect(() => {
    if (files.length === 1 && files[0].type.includes('pdf')) {
      loadPdfThumbnails(files[0]);
    }
  }, [files]);

  const loadPdfThumbnails = async (file: File) => {
    try {
      setStatusMessage('Rendering page previews...');
      const buffer = await file.arrayBuffer();
      // Render first 12 pages for speed
      const pageCount = await getPageCountFromBuffer(buffer);
      const thumbs: LoadedPageThumbnail[] = [];
      const renderLimit = Math.min(pageCount, 16);

      for (let i = 0; i < renderLimit; i++) {
        const url = await renderPdfPageToDataUrl(buffer, i, 0.4);
        thumbs.push({ pageIndex: i, dataUrl: url, rotation: 0 });
      }
      setPageThumbnails(thumbs);
      setStatusMessage('');
    } catch (err) {
      console.error('Page thumbnail rendering error:', err);
      setStatusMessage('');
    }
  };

  const getPageCountFromBuffer = async (buffer: ArrayBuffer): Promise<number> => {
    try {
      const { PDFDocument } = await import('pdf-lib');
      const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
      return pdf.getPageCount();
    } catch {
      return 1;
    }
  };

  // Handle Drag & Drop / File Input
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files) as File[];
      addFiles(droppedFiles);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files) as File[];
      addFiles(selectedFiles);
    }
  };

  const addFiles = (newFiles: File[]) => {
    setErrorMessage('');
    if (toolId === 'img-to-pdf') {
      const validImages = newFiles.filter((f) => f.type.startsWith('image/'));
      if (validImages.length === 0) {
        setErrorMessage('Please upload valid image files (JPG, PNG, WEBP).');
        return;
      }
      setFiles((prev) => [...prev, ...validImages]);
    } else {
      const validPdfs = newFiles.filter((f) => f.type.includes('pdf') || f.name.endsWith('.pdf'));
      if (validPdfs.length === 0) {
        setErrorMessage('Please upload valid PDF files.');
        return;
      }
      if (toolId === 'merge') {
        setFiles((prev) => [...prev, ...validPdfs]);
      } else {
        setFiles([validPdfs[0]]); // single PDF tool
      }
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    if (files.length <= 1) {
      setPageThumbnails([]);
      setSelectedPageIndices([]);
    }
  };

  // Perform PDF Action
  const executeProcessing = async () => {
    if (files.length === 0) {
      setErrorMessage('Please upload at least one file to process.');
      return;
    }

    setIsProcessing(true);
    setProcessingProgress(10);
    setErrorMessage('');
    setStatusMessage('Initializing processing engine...');

    try {
      let resultData: Uint8Array | null = null;
      let outputFilename = `Processed_${files[0].name}`;
      let mimeType = 'application/pdf';
      let originalSize = files[0].size;
      let newSize = originalSize;

      setProcessingProgress(35);

      if (toolId === 'merge') {
        setStatusMessage('Merging PDF pages...');
        resultData = await mergePDFs(files);
        outputFilename = `Merged_PDF_${Date.now().toString().slice(-4)}.pdf`;
        newSize = resultData.byteLength;
      } else if (toolId === 'split') {
        setStatusMessage('Splitting pages...');
        let indicesToKeep: number[] = [];
        if (splitMode === 'selected' && selectedPageIndices.length > 0) {
          indicesToKeep = selectedPageIndices;
        } else {
          // parse range e.g. "1-3, 5"
          const ranges = splitRangeText.split(',');
          for (const r of ranges) {
            const clean = r.trim();
            if (clean.includes('-')) {
              const [start, end] = clean.split('-').map((n) => parseInt(n) - 1);
              for (let i = start; i <= end; i++) {
                if (!isNaN(i)) indicesToKeep.push(i);
              }
            } else {
              const p = parseInt(clean) - 1;
              if (!isNaN(p)) indicesToKeep.push(p);
            }
          }
        }
        if (indicesToKeep.length === 0) indicesToKeep = [0];
        resultData = await splitPDF(files[0], indicesToKeep);
        outputFilename = `Split_${files[0].name}`;
        newSize = resultData.byteLength;
      } else if (toolId === 'compress') {
        setStatusMessage('Compressing and optimizing stream objects...');
        const compressed = await compressPDF(files[0], compressQuality);
        resultData = compressed.data;
        originalSize = compressed.originalSize;
        newSize = compressed.newSize;
        outputFilename = `Compressed_${files[0].name}`;
      } else if (toolId === 'img-to-pdf') {
        setStatusMessage('Converting images into PDF pages...');
        resultData = await convertImagesToPDF(files, imgToPdfOptions);
        outputFilename = `Converted_Images_${Date.now().toString().slice(-4)}.pdf`;
        newSize = resultData.byteLength;
      } else if (toolId === 'rotate') {
        setStatusMessage('Applying rotation angles...');
        const rotationMap = new Map<number, number>();
        pageThumbnails.forEach((t) => {
          if (t.rotation !== 0) rotationMap.set(t.pageIndex, t.rotation);
        });
        resultData = await rotatePDFPages(files[0], rotationMap);
        outputFilename = `Rotated_${files[0].name}`;
        newSize = resultData.byteLength;
      } else if (toolId === 'delete-pages') {
        setStatusMessage('Removing selected pages...');
        if (selectedPageIndices.length === 0) {
          throw new Error('Please select at least one page to delete.');
        }
        resultData = await deletePDFPages(files[0], selectedPageIndices);
        outputFilename = `Cleaned_${files[0].name}`;
        newSize = resultData.byteLength;
      } else if (toolId === 'rearrange') {
        setStatusMessage('Re-indexing page sequence...');
        const newOrder = pageThumbnails.map((t) => t.pageIndex);
        resultData = await rearrangePDFPages(files[0], newOrder);
        outputFilename = `Rearranged_${files[0].name}`;
        newSize = resultData.byteLength;
      } else if (toolId === 'watermark') {
        setStatusMessage('Stamping watermark layers...');
        resultData = await addWatermarkToPDF(
          files[0],
          watermarkConfig.text,
          {
            opacity: watermarkConfig.opacity,
            rotation: watermarkConfig.rotation,
            size: watermarkConfig.fontSize,
            colorHex: watermarkConfig.color,
          }
        );
        outputFilename = `Watermarked_${files[0].name}`;
        newSize = resultData.byteLength;
      } else if (toolId === 'protect') {
        setStatusMessage('Encrypting document streams...');
        if (!passwordInput) throw new Error('Please enter a password to protect the PDF.');
        resultData = await protectPDF(files[0], passwordInput);
        outputFilename = `Protected_${files[0].name}`;
        newSize = resultData.byteLength;
      } else if (toolId === 'unlock') {
        setStatusMessage('Removing security restrictions...');
        resultData = await protectPDF(files[0], ''); // Save unlocked stream
        outputFilename = `Unlocked_${files[0].name}`;
        newSize = resultData.byteLength;
      } else if (toolId === 'ocr') {
        setStatusMessage('Running Gemini AI Document OCR Engine...');
        setProcessingProgress(60);
        
        // Convert first thumbnail or image to base64
        let base64Img = '';
        if (pageThumbnails.length > 0) {
          base64Img = pageThumbnails[0].dataUrl;
        } else if (files[0].type.startsWith('image/')) {
          const buffer = await files[0].arrayBuffer();
          const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
          base64Img = `data:${files[0].type};base64,${base64}`;
        }

        const response = await fetch('/api/ocr', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64: base64Img || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
            mimeType: 'image/png',
            prompt: 'Perform high accuracy OCR extraction on this document page. Output clean text.',
          }),
        });

        const resData = await response.json();
        if (!response.ok || !resData.success) {
          throw new Error(resData.error || 'Failed to extract text using Gemini AI.');
        }

        setExtractedOcrText(resData.text);
        outputFilename = `Extracted_Text_${files[0].name}.txt`;
      }

      setProcessingProgress(90);

      // Log to auth context & check limit
      const allowed = logActivity(toolId, toolMeta.name, files[0].name, originalSize, newSize);
      if (!allowed) {
        setIsProcessing(false);
        return;
      }

      setProcessingProgress(100);

      if (toolId !== 'ocr' && resultData) {
        setProcessedResult({
          data: resultData,
          filename: outputFilename,
          mimeType,
          originalSize,
          newSize,
        });
      }

      setIsProcessing(false);
      
      // Fire confetti celebration!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

    } catch (err: any) {
      console.error('Processing error:', err);
      setErrorMessage(err.message || 'Processing failed. Please try again with another file.');
      setIsProcessing(false);
    }
  };

  // AI Summarization action handler
  const handleAiAction = async (action: 'summarize' | 'translate') => {
    if (!extractedOcrText) return;
    setIsProcessing(true);
    setStatusMessage(`Running Gemini AI ${action}...`);
    try {
      const res = await fetch('/api/ai-tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: extractedOcrText, action }),
      });
      const data = await res.json();
      if (data.success) {
        setAiSummary(data.result);
      } else {
        setErrorMessage(data.error || 'AI action failed');
      }
    } catch (e: any) {
      setErrorMessage(e.message || 'Network error');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Top Header & Back Button */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-slate-800">
        <button
          onClick={onBackToGrid}
          className="flex items-center space-x-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Tools</span>
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">
            {toolMeta.category.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Tool Title Block */}
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          {toolSeo?.h1 || toolMeta.name}
        </h1>
        <h2 className="mt-3 text-base sm:text-lg font-medium text-gray-600 dark:text-gray-300">
          {toolSeo?.h2 || toolMeta.shortDesc}
        </h2>

        {toolSeo?.features && toolSeo.features.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {toolSeo.features.map((feat, idx) => (
              <span
                key={idx}
                className="inline-flex items-center space-x-1 text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200/80 dark:border-slate-700"
              >
                <Check className="w-3 h-3 text-emerald-500" />
                <span>{feat}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 flex items-start space-x-3 text-rose-800 dark:text-rose-300">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="flex-1 text-sm font-medium">{errorMessage}</div>
        </div>
      )}

      {/* STAGE 1: FILE UPLOAD ZONE */}
      {files.length === 0 && !processedResult && (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-400 bg-white dark:bg-slate-800/80 rounded-3xl p-10 sm:p-16 text-center cursor-pointer transition-all hover:shadow-xl group"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            multiple={toolId === 'merge' || toolId === 'img-to-pdf'}
            accept={toolId === 'img-to-pdf' ? 'image/png, image/jpeg, image/webp' : 'application/pdf'}
            className="hidden"
          />

          <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Upload className="w-10 h-10" />
          </div>

          <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">
            Drag & Drop your {toolId === 'img-to-pdf' ? 'images' : 'PDF files'} here
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            or click to browse from your computer (Up to 500 MB)
          </p>

          <div className="mt-8 inline-flex items-center space-x-2 text-xs text-gray-400 dark:text-gray-500 font-medium bg-gray-50 dark:bg-slate-900 px-4 py-2 rounded-full border border-gray-200 dark:border-slate-800">
            <Lock className="w-3.5 h-3.5" />
            <span>Files remain private & processed locally in memory</span>
          </div>
        </div>
      )}

      {/* STAGE 2: CONFIGURATION & PAGE VISUALIZER */}
      {files.length > 0 && !processedResult && (
        <div className="space-y-8">
          
          {/* File Cards List */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Uploaded Files ({files.length})</span>
              </h3>
              {(toolId === 'merge' || toolId === 'img-to-pdf') && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center space-x-1"
                >
                  <span>+ Add More Files</span>
                </button>
              )}
            </div>

            <div className="space-y-2">
              {files.map((f, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-slate-900/60 border border-gray-100 dark:border-slate-800"
                >
                  <div className="flex items-center space-x-3 truncate">
                    <FileCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate max-w-md">
                      {f.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      ({(f.size / (1024 * 1024)).toFixed(2)} MB)
                    </span>
                  </div>

                  <button
                    onClick={() => removeFile(idx)}
                    className="p-1.5 text-gray-400 hover:text-rose-500 rounded-lg transition-colors"
                    title="Remove File"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* TOOL SPECIFIC CONTROLS */}
          
          {/* 1. Compress Options */}
          {toolId === 'compress' && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">
                Select Compression Level
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'recommended', label: 'Recommended', desc: 'Good quality, ~35% size reduction' },
                  { id: 'extreme', label: 'Extreme', desc: 'High compression, ~60% size reduction' },
                  { id: 'less', label: 'Less Compression', desc: 'High quality, ~15% size reduction' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setCompressQuality(opt.id as any)}
                    className={`p-4 rounded-xl text-left border-2 transition-all ${
                      compressQuality === opt.id
                        ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300'
                        : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    <p className="font-bold text-sm">{opt.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2. Split Options */}
          {toolId === 'split' && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">
                Split Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="splitMode"
                      checked={splitMode === 'range'}
                      onChange={() => setSplitMode('range')}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      Extract Page Range
                    </span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="splitMode"
                      checked={splitMode === 'selected'}
                      onChange={() => setSplitMode('selected')}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      Select Pages Visually
                    </span>
                  </label>
                </div>

                {splitMode === 'range' && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      Page Ranges (e.g., 1-3, 5, 8-10)
                    </label>
                    <input
                      type="text"
                      value={splitRangeText}
                      onChange={(e) => setSplitRangeText(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-medium text-gray-900 dark:text-white"
                      placeholder="1-3, 5"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 3. Watermark Options */}
          {toolId === 'watermark' && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">
                Watermark Styling
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    Watermark Text
                  </label>
                  <input
                    type="text"
                    value={watermarkConfig.text}
                    onChange={(e) => setWatermarkConfig({ ...watermarkConfig, text: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-medium text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    Font Size ({watermarkConfig.fontSize}pt)
                  </label>
                  <input
                    type="range"
                    min="18"
                    max="96"
                    value={watermarkConfig.fontSize}
                    onChange={(e) => setWatermarkConfig({ ...watermarkConfig, fontSize: Number(e.target.value) })}
                    className="w-full accent-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    Opacity ({Math.round(watermarkConfig.opacity * 100)}%)
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={watermarkConfig.opacity}
                    onChange={(e) => setWatermarkConfig({ ...watermarkConfig, opacity: Number(e.target.value) })}
                    className="w-full accent-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    Rotation ({watermarkConfig.rotation}°)
                  </label>
                  <input
                    type="range"
                    min="-90"
                    max="90"
                    value={watermarkConfig.rotation}
                    onChange={(e) => setWatermarkConfig({ ...watermarkConfig, rotation: Number(e.target.value) })}
                    className="w-full accent-emerald-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 4. Password Protect Options */}
          {(toolId === 'protect' || toolId === 'unlock') && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">
                {toolId === 'protect' ? 'Set Encryption Password' : 'Enter Decryption Password'}
              </h3>
              <div>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter strong password..."
                  className="w-full max-w-md px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {/* PAGE VISUAL GRID (for rotate, delete, split visual selection, rearrange) */}
          {pageThumbnails.length > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Page Preview Grid ({pageThumbnails.length} pages rendered)
                </h3>
                {toolId === 'rotate' && (
                  <button
                    onClick={() => {
                      setPageThumbnails((prev) =>
                        prev.map((p) => ({ ...p, rotation: (p.rotation + 90) % 360 }))
                      );
                    }}
                    className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center space-x-1"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Rotate All 90°</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-h-96 overflow-y-auto p-2 custom-scrollbar">
                {pageThumbnails.map((thumb, idx) => {
                  const isSelected = selectedPageIndices.includes(idx);

                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        if (toolId === 'delete-pages' || toolId === 'split') {
                          if (isSelected) {
                            setSelectedPageIndices(selectedPageIndices.filter((i) => i !== idx));
                          } else {
                            setSelectedPageIndices([...selectedPageIndices, idx]);
                          }
                        }
                      }}
                      className={`relative group bg-gray-100 dark:bg-slate-900 rounded-xl p-2 border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-rose-500 ring-2 ring-rose-500/20'
                          : 'border-gray-200 dark:border-slate-700 hover:border-emerald-500'
                      }`}
                    >
                      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-white flex items-center justify-center">
                        <img
                          src={thumb.dataUrl}
                          alt={`Page ${idx + 1}`}
                          style={{ transform: `rotate(${thumb.rotation}deg)` }}
                          className="max-h-full max-w-full object-contain transition-transform"
                        />
                      </div>

                      <div className="mt-2 flex items-center justify-between text-xs font-semibold text-gray-600 dark:text-gray-400 px-1">
                        <span>Page {idx + 1}</span>

                        {toolId === 'rotate' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setPageThumbnails((prev) =>
                                prev.map((p, i) =>
                                  i === idx ? { ...p, rotation: (p.rotation + 90) % 360 } : p
                                )
                              );
                            }}
                            className="p-1 hover:text-emerald-600 rounded"
                            title="Rotate 90 deg"
                          >
                            <RotateCw className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {toolId === 'delete-pages' && isSelected && (
                        <div className="absolute inset-0 bg-rose-500/20 backdrop-blur-[1px] rounded-xl flex items-center justify-center">
                          <span className="bg-rose-600 text-white font-bold text-xs px-2 py-1 rounded-md">
                            Delete Page
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* PROGRESS BAR & PROCESS BUTTON */}
          <div className="pt-4">
            {isProcessing ? (
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm text-center">
                <div className="w-12 h-12 mx-auto rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin mb-4" />
                <p className="text-base font-bold text-gray-900 dark:text-white">
                  {statusMessage || 'Processing PDF...'}
                </p>
                <div className="w-full max-w-md mx-auto bg-gray-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden mt-4">
                  <div
                    className="bg-emerald-600 h-full transition-all duration-300"
                    style={{ width: `${processingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <button
                onClick={executeProcessing}
                className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.01] flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>Process {toolMeta.name}</span>
              </button>
            )}
          </div>

        </div>
      )}

      {/* STAGE 3: COMPLETED RESULTS & DOWNLOAD */}
      {processedResult && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-200 dark:border-slate-700 p-8 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
              Your Document is Ready!
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              File processed in client memory. Click download to save to your device.
            </p>
          </div>

          {/* Size savings card if compression */}
          {processedResult.originalSize && processedResult.newSize && (
            <div className="inline-flex items-center space-x-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 rounded-2xl px-6 py-3 text-sm">
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400 block">Original</span>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  {(processedResult.originalSize / (1024 * 1024)).toFixed(2)} MB
                </span>
              </div>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">→</span>
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400 block">Compressed</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {(processedResult.newSize / (1024 * 1024)).toFixed(2)} MB
                </span>
              </div>
            </div>
          )}

          {/* Download & Share Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto pt-4">
            <button
              onClick={() => downloadFile(processedResult.data, processedResult.filename, processedResult.mimeType)}
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-lg shadow-emerald-600/30 transition-all hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Download File</span>
            </button>

            <button
              onClick={() => {
                setFiles([]);
                setProcessedResult(null);
              }}
              className="w-full py-4 rounded-2xl bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-gray-200 font-bold text-base transition-colors flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Start Over</span>
            </button>
          </div>
        </div>
      )}

      {/* STAGE 4: OCR EXTRACTED TEXT DISPLAY (For OCR tool) */}
      {toolId === 'ocr' && extractedOcrText && (
        <div className="mt-8 bg-white dark:bg-slate-800 rounded-3xl border border-gray-200 dark:border-slate-700 p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-slate-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-emerald-500" />
              <span>Gemini AI Extracted Text</span>
            </h3>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => copyToClipboard(extractedOcrText)}
                className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-slate-700 text-xs font-semibold text-gray-800 dark:text-gray-200 flex items-center space-x-1 hover:bg-gray-200"
              >
                {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedText ? 'Copied!' : 'Copy Text'}</span>
              </button>

              <button
                onClick={() => handleAiAction('summarize')}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500"
              >
                AI Summarize
              </button>
            </div>
          </div>

          <textarea
            value={extractedOcrText}
            onChange={(e) => setExtractedOcrText(e.target.value)}
            rows={10}
            className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-slate-900 text-sm font-mono border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500"
          />

          {aiSummary && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
              <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-300 mb-2">
                Gemini AI Executive Summary
              </h4>
              <p className="text-xs text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                {aiSummary}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Related Tools Internal Linking */}
      {onSelectTool && (
        <RelatedTools currentToolId={toolId} onSelectTool={onSelectTool} />
      )}

      {/* Tool FAQ Accordion Section */}
      <ToolFaqSection toolId={toolId} />

    </div>
  );
};
