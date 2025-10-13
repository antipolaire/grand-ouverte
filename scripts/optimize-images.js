#!/usr/bin/env node
/**
 * Image Optimization Script
 * Optimizes images in the public/images directory
 * Run with: npm run optimize:images
 */

import sharp from 'sharp';
import { readdir, mkdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { existsSync } from 'fs';

const INPUT_DIR = './public/images';
const OUTPUT_DIR = './public/images-optimized';
const QUALITY = 80; // JPEG/WebP quality (0-100)

// Supported formats
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp', '.tiff'];

async function optimizeImage(inputPath, outputPath) {
  const ext = extname(inputPath).toLowerCase();
  const baseName = basename(inputPath, ext);
  
  try {
    console.log(`📸 Processing: ${basename(inputPath)}`);
    
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Create optimized version
    let optimized = image;
    
    // Resize if too large (max 1920px width for web)
    if (metadata.width > 1920) {
      optimized = optimized.resize(1920, null, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }
    
    // Convert and optimize based on format
    if (['.jpg', '.jpeg'].includes(ext)) {
      await optimized
        .jpeg({ quality: QUALITY, progressive: true, mozjpeg: true })
        .toFile(join(outputPath, `${baseName}.jpg`));
      
      // Also create WebP version
      await sharp(inputPath)
        .resize(metadata.width > 1920 ? 1920 : null, null, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .webp({ quality: QUALITY })
        .toFile(join(outputPath, `${baseName}.webp`));
      
      console.log(`  ✅ Optimized JPEG + WebP`);
    } else if (ext === '.png') {
      await optimized
        .png({ quality: QUALITY, compressionLevel: 9, palette: true })
        .toFile(join(outputPath, `${baseName}.png`));
      
      // Also create WebP version for PNGs
      await sharp(inputPath)
        .resize(metadata.width > 1920 ? 1920 : null, null, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .webp({ quality: QUALITY, lossless: false })
        .toFile(join(outputPath, `${baseName}.webp`));
      
      console.log(`  ✅ Optimized PNG + WebP`);
    } else if (ext === '.webp') {
      await optimized
        .webp({ quality: QUALITY })
        .toFile(join(outputPath, `${baseName}.webp`));
      
      console.log(`  ✅ Optimized WebP`);
    }
    
  } catch (error) {
    console.error(`  ❌ Error processing ${basename(inputPath)}:`, error.message);
  }
}

async function processDirectory(inputDir, outputDir) {
  try {
    // Check if input directory exists
    if (!existsSync(inputDir)) {
      console.log(`⚠️  Input directory not found: ${inputDir}`);
      console.log(`   Creating directory...`);
      await mkdir(inputDir, { recursive: true });
      console.log(`   ✅ Created ${inputDir}`);
      console.log(`   Please add your images to this directory and run again.`);
      return;
    }

    // Create output directory if it doesn't exist
    if (!existsSync(outputDir)) {
      await mkdir(outputDir, { recursive: true });
    }

    const files = await readdir(inputDir);
    const imageFiles = files.filter(file => 
      SUPPORTED_FORMATS.includes(extname(file).toLowerCase())
    );

    if (imageFiles.length === 0) {
      console.log(`⚠️  No images found in ${inputDir}`);
      return;
    }

    console.log(`\n🚀 Found ${imageFiles.length} images to optimize\n`);

    for (const file of imageFiles) {
      await optimizeImage(
        join(inputDir, file),
        outputDir
      );
    }

    console.log(`\n✨ Done! Optimized images saved to: ${outputDir}`);
    console.log(`\n💡 Tip: Replace the images in ${inputDir} with the optimized versions`);
    console.log(`   or update your imports to use the optimized directory.\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the script
console.log('🎨 Image Optimization Tool\n');
processDirectory(INPUT_DIR, OUTPUT_DIR);
