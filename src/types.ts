export type ToolCategory = 'all' | 'organize' | 'convert' | 'security' | 'edit';

export type ToolId =
  | 'merge'
  | 'split'
  | 'compress'
  | 'img-to-pdf'
  | 'pdf-to-img'
  | 'rotate'
  | 'delete-pages'
  | 'rearrange'
  | 'watermark'
  | 'protect'
  | 'unlock'
  | 'ocr';

export interface ToolMeta {
  id: ToolId;
  name: string;
  shortDesc: string;
  category: ToolCategory;
  iconName: string;
  badge?: 'Popular' | 'New' | 'Premium' | 'Essential';
  isPremiumOnly?: boolean;
}

export type PlanType = 'free' | 'premium' | 'business';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  plan: PlanType;
  dailyUsageCount: number;
  maxDailyUsage: number;
  favorites: ToolId[];
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  toolId: ToolId;
  toolName: string;
  fileName: string;
  fileSize: number;
  processedSize?: number;
  timestamp: string;
  status: 'completed' | 'failed';
  downloadUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'PDF Tips' | 'Student Resources' | 'Office Productivity' | 'Business Documents' | 'Tutorials';
  readTime: string;
  date: string;
  author: string;
  imageUrl: string;
}

export interface WatermarkOptions {
  text: string;
  fontSize: number;
  opacity: number;
  rotation: number;
  color: string;
  position: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'tile';
}

export interface CompressOptions {
  level: 'recommended' | 'extreme' | 'less';
}

export interface ImageToPdfOptions {
  pageSize: 'A4' | 'Letter' | 'Fit';
  orientation: 'portrait' | 'landscape';
  margin: number;
}
