# FAL AI MCP Server Setup Guide

## ✅ Installation Complete!

The FAL AI MCP server has been successfully installed and is ready to use.

## 🔧 Available Tools

The FAL AI MCP server provides these powerful tools:

### 1. **generate_image**
- **Purpose**: Generate images using the Flux model
- **Parameters**: 
  - `prompt` (string): Description of the image to generate
- **Output**: High-quality 512x512 PNG images
- **Example**: "A serene mountain landscape at sunset"

### 2. **generate_image_lora**
- **Purpose**: Generate images using Flux model with LoRA (Low-Rank Adaptation)
- **Parameters**:
  - `prompt` (string): Description of the image
  - `lora_url` (string): URL to the LoRA model
  - `lora_scale` (float, default: 1): Scale factor for LoRA influence
- **Output**: Customized images with specific style adaptations

### 3. **edit_image**
- **Purpose**: Edit existing images using Gemini Flash Edit model
- **Parameters**:
  - `prompt` (string): Description of desired edits
  - `image_path` (string): Path to the image to edit
- **Output**: Modified version of the input image

### 4. **generate_video**
- **Purpose**: Generate videos from images using wan-i2v/turbo model
- **Parameters**:
  - `prompt` (string): Description of the video motion/content
  - `image_path` (string): Path to the initial image
  - `negative_prompt` (string, optional): What to avoid in the video
- **Output**: 81-frame MP4 videos at 16 FPS (480p resolution)

## 🔑 Setup Requirements

### 1. Get FAL AI API Key
1. Visit [fal.ai](https://fal.ai)
2. Sign up for an account
3. Navigate to your dashboard
4. Generate an API key

### 2. Configure Environment
Update the `fal-ai-mcp-config.json` file with your API key:

```json
{
  "mcpServers": {
    "fal-ai-mcp-server": {
      "command": "uvx",
      "args": ["fal-ai-mcp-server"],
      "env": {
        "FAL_KEY": "your-actual-fal-ai-api-key",
        "SAVE_MEDIA_DIR": "/home/coder/workspace/understand.me/fal-ai-generated"
      }
    }
  }
}
```

## 📁 Output Directory

Generated images and videos will be saved to:
```
/home/coder/workspace/understand.me/fal-ai-generated/
```

Files are automatically numbered (e.g., `00001.png`, `00002.mp4`, etc.)

## 🚀 Usage Examples

### Generate a Promotional Image
```
Tool: generate_image
Prompt: "Professional mental health app interface showing peaceful conversation between two people, modern UI design, calming blue and green colors, therapeutic atmosphere"
```

### Create Video Content
```
Tool: generate_video
Image: Upload a screenshot of your app
Prompt: "Smooth UI transitions, gentle animations, peaceful user interaction"
```

### Edit Existing Images
```
Tool: edit_image
Image: Your app logo or screenshot
Prompt: "Add soft therapeutic lighting and calming atmosphere"
```

## 💡 Tips for Best Results

1. **Be Specific**: Detailed prompts yield better results
2. **Use Therapeutic Language**: Include words like "calming", "peaceful", "therapeutic"
3. **Specify Style**: Mention "professional", "modern", "clean" for app-related content
4. **Color Guidance**: Specify therapeutic colors (blues, greens, soft pastels)

## 🔧 Technical Details

- **Image Resolution**: 512x512 pixels (PNG format)
- **Video Resolution**: 480p (MP4 format)
- **Video Length**: ~5 seconds (81 frames at 16 FPS)
- **Safety**: Built-in content filtering enabled
- **Quality**: 28 inference steps for high-quality output

## 🎯 Perfect for Understand.me

This setup is ideal for creating:
- App promotional materials
- UI mockups and prototypes
- Video demonstrations
- Marketing content
- Therapeutic-themed visuals
- User interface animations

The FAL AI MCP server is now ready to help you create professional visual content for your mental health application!
