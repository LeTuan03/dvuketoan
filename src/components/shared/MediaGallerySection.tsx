"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlayCircleOutlined, PictureOutlined, VideoCameraOutlined } from '@ant-design/icons';
import SectionHeading from '@/components/shared/SectionHeading';
import { Image, Modal, Tabs } from 'antd';
import { useLocale } from '@/lib/i18n/LocaleProvider';

type MediaItem = {
  id: string;
  title: string;
  url: string;
  thumbnail: string | null;
  mediaType: string;
  status: string;
  featured: boolean;
};

export default function MediaGallerySection() {
  const { locale } = useLocale();
  const en = locale === 'en';
  
  const [images, setImages] = useState<MediaItem[]>([]);
  const [videos, setVideos] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('');

  useEffect(() => {
    let mounted = true;
    fetch('/api/data/media-gallery')
      .then(res => res.json())
      .then(data => {
        if (mounted && data) {
          if (data.images) setImages(data.images.filter((img: MediaItem) => img.status === 'active'));
          if (data.videos) setVideos(data.videos.filter((vid: MediaItem) => vid.status === 'active'));
        }
      })
      .catch(console.error)
      .finally(() => {
        if (mounted) setLoading(false);
      });
      
    return () => { mounted = false; };
  }, []);

  if (loading || (images.length === 0 && videos.length === 0)) {
    return null; // hide section if no media
  }

  const handleViewImage = (url: string) => {
    setPreviewImage(url);
    setPreviewOpen(true);
  };

  const handlePlayVideo = (url: string) => {
    setCurrentVideo(url);
    setVideoModalOpen(true);
  };

  const imagesTab = (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
      {images.map((img) => (
        <motion.div
          key={img.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative group rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer shadow-sm hover:shadow-xl transition-all"
          onClick={() => handleViewImage(img.url)}
        >
          <img src={img.url || '/images/default-article.svg'} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white text-3xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              <PictureOutlined />
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
             <p className="text-white text-sm font-semibold truncate">{img.title}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const videosTab = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {videos.map((vid) => (
        <motion.div
          key={vid.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative group rounded-2xl overflow-hidden aspect-video cursor-pointer shadow-sm hover:shadow-xl transition-all"
          onClick={() => handlePlayVideo(vid.url)}
        >
          <img src={vid.thumbnail || '/images/default-article.svg'} alt={vid.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
             <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white text-4xl group-hover:scale-110 group-hover:bg-primary transition-all shadow-xl">
               <PlayCircleOutlined />
             </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
             <h3 className="text-white font-semibold text-lg line-clamp-1">{vid.title}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const tabItems = [];
  if (images.length > 0) {
    tabItems.push({
      key: 'images',
      label: <span className="font-semibold px-4"><PictureOutlined className="mr-2" />{en ? 'Images' : 'Hình ảnh'}</span>,
      children: imagesTab,
    });
  }
  
  if (videos.length > 0) {
    tabItems.push({
      key: 'videos',
      label: <span className="font-semibold px-4"><VideoCameraOutlined className="mr-2" />{en ? 'Videos' : 'Videos'}</span>,
      children: videosTab,
    });
  }

  return (
    <section id="thu-vien" className="scroll-mt-32 py-16 lg:py-24 bg-paper border-t border-line">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <SectionHeading
            align="center"
            eyebrow={en ? 'Media Gallery' : 'Thư viện'}
            title={en ? 'Moments & Activities' : 'Hình ảnh & Hoạt động'}
            subtitle={en ? 'Explore VTAX through our media collection.' : 'Khám phá không gian và hoạt động tại VTAX qua những hình ảnh, video sinh động.'}
          />
        </div>
        
        {tabItems.length > 1 ? (
          <Tabs items={tabItems} centered className="media-tabs" />
        ) : (
          tabItems[0]?.children
        )}
      </div>

      <div style={{ display: 'none' }}>
        <Image.PreviewGroup preview={{ open: previewOpen, onOpenChange: (vis) => setPreviewOpen(vis) }}>
          {previewImage ? <Image src={previewImage} fallback="/images/default-article.svg" /> : null}
        </Image.PreviewGroup>
      </div>

      <Modal
        open={videoModalOpen}
        onCancel={() => {
          setVideoModalOpen(false);
          setCurrentVideo('');
        }}
        footer={null}
        width={900}
        centered
        destroyOnClose
        styles={{ body: { padding: 0, background: '#000' } }}
        closeIcon={<span className="text-white bg-black/50 w-8 h-8 rounded-full flex items-center justify-center hover:bg-primary transition-colors">✕</span>}
      >
        {currentVideo && (
          <div className="aspect-video w-full">
             {currentVideo.includes('youtube') || currentVideo.includes('youtu.be') ? (
                <iframe
                  className="w-full h-full"
                  src={
                    currentVideo.includes('youtube.com/watch?v=') 
                      ? currentVideo.replace('watch?v=', 'embed/') 
                      : currentVideo.includes('youtu.be/') 
                        ? currentVideo.replace('youtu.be/', 'youtube.com/embed/') 
                        : currentVideo
                  }
                  title="Video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
             ) : (
                <video src={currentVideo} controls autoPlay className="w-full h-full" />
             )}
          </div>
        )}
      </Modal>
    </section>
  );
}
