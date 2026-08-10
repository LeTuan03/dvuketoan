import prisma from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export class MediaService {
  // Images
  async getImages() {
    const items = await prisma.mediaGallery.findMany({ 
      where: { mediaType: 'image' },
      orderBy: { order: 'asc' } 
    });
    return items.map(item => ({ ...item, id: item.id.toString() }));
  }

  async addImage(data: any) {
    const { id, mediaType, ...createData } = data;
    const image = await prisma.mediaGallery.create({ 
      data: {
        ...createData,
        mediaType: 'image',
        status: 'active'
      } 
    });
    return String(image.id);
  }

  async updateImage(id: any, data: any) {
    if (id === undefined || id === null) throw new Error('ID is required for updateImage');
    console.log(`[MediaService] Updating image ID: ${id}, Type: ${typeof id}`);
    const { id: _, mediaType, ...updateData } = data;
    await prisma.mediaGallery.update({ 
      where: { id: BigInt(id) as any }, 
      data: updateData 
    });
  }

  async deleteImage(id: any) {
    console.log(`[MediaService] deleteImage received ID:`, id, `Type:`, typeof id);
    if (id === undefined || id === null) throw new Error('ID is required for deleteImage');
    
    // 1. Get image info to get the file path
    const image = await prisma.mediaGallery.findUnique({
      where: { id: BigInt(id) as any }
    });

    if (image && image.url) {
      try {
        // 2. Resolve physical path
        const filePath = path.join(process.cwd(), 'public', image.url);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log(`[MediaService] Deleted physical file: ${filePath}`);
        }
      } catch (err) {
        console.error(`[MediaService] Error deleting file ${image.url}:`, err);
      }
    }

    // 3. Delete from DB
    console.log(`[MediaService] Deleting image record ID: ${id}`);
    await prisma.mediaGallery.delete({ 
      where: { id: BigInt(id) as any } 
    });
  }

  // Videos
  async getVideos() {
    const items = await prisma.mediaGallery.findMany({ 
      where: { mediaType: 'video' },
      orderBy: { order: 'asc' } 
    });
    return items.map(item => ({ ...item, id: item.id.toString() }));
  }

  async addVideo(data: any) {
    const { id, mediaType, ...createData } = data;
    const video = await prisma.mediaGallery.create({ 
      data: {
        ...createData,
        mediaType: 'video',
        status: 'active'
      } 
    });
    return String(video.id);
  }

  async updateVideo(id: any, data: any) {
    if (id === undefined || id === null) throw new Error('ID is required for updateVideo');
    console.log(`[MediaService] Updating video ID: ${id}, Type: ${typeof id}`);
    const { id: _, mediaType, ...updateData } = data;
    await prisma.mediaGallery.update({ 
      where: { id: BigInt(id) as any }, 
      data: updateData 
    });
  }

  async deleteVideo(id: any) {
    console.log(`[MediaService] deleteVideo received ID:`, id, `Type:`, typeof id);
    if (id === undefined || id === null) throw new Error('ID is required for deleteVideo');
    
    // 1. Get video info
    const video = await prisma.mediaGallery.findUnique({
      where: { id: BigInt(id) as any }
    });

    if (video) {
      try {
        // Delete video file
        if (video.url) {
          const videoPath = path.join(process.cwd(), 'public', video.url);
          if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
        }
        // Delete thumbnail file
        if (video.thumbnail) {
          const thumbPath = path.join(process.cwd(), 'public', video.thumbnail);
          if (fs.existsSync(thumbPath)) fs.unlinkSync(thumbPath);
        }
        console.log(`[MediaService] Deleted physical files for video: ${id}`);
      } catch (err) {
        console.error(`[MediaService] Error deleting video files:`, err);
      }
    }

    // 2. Delete from DB
    await prisma.mediaGallery.delete({ 
      where: { id: BigInt(id) as any } 
    });
  }
}

export const mediaService = new MediaService();
