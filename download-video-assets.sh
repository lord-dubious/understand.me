#!/bin/bash

# Understand.me Video Assets Download Script
# Downloads all generated images for video production

echo "🎬 Downloading Understand.me Video Assets..."

# Create directory structure
mkdir -p understand-me-video/{images,audio,video-segments,final}

# Download all scene images
echo "📥 Downloading scene images..."

# Scene 1: Opening Contrast
curl -o "understand-me-video/images/scene-01-opening-contrast.webp" \
  "https://evalstate-flux1-schnell.hf.space/gradio_api/file=/tmp/gradio/99ee8f54682ea402cac1057bd74ed838accca9778c880cbe4cf202ff33525c78/image.webp42"

# Scene 2: Private Hesitation  
curl -o "understand-me-video/images/scene-02-private-hesitation.webp" \
  "https://evalstate-flux1-schnell.hf.space/gradio_api/file=/tmp/gradio/fbe150671383add1f019d2ff4bd52443951316ca7cdf0ac937defc1b9729117d/image.webp42"

# Scene 3: Dual Isolation
curl -o "understand-me-video/images/scene-03-dual-isolation.webp" \
  "https://evalstate-flux1-schnell.hf.space/gradio_api/file=/tmp/gradio/fe9ee086ad61f788b296386338e8f62c2dcf002b3ac8859f6007e5a07fa4b61a/image.webp42"

# Scene 4: Emotional Visualization
curl -o "understand-me-video/images/scene-04-emotional-viz.webp" \
  "https://evalstate-flux1-schnell.hf.space/gradio_api/file=/tmp/gradio/c481200cb02953b4b2023e469fda08ed604fd46e23f56321c848d274475b0647/image.webp42"

# Scene 5: Jamie's Turn
curl -o "understand-me-video/images/scene-05-jamie-turn.webp" \
  "https://evalstate-flux1-schnell.hf.space/gradio_api/file=/tmp/gradio/62aad34bc609d95f61a033b4c9f773e112ce20de6a77778e4eabd95d226fa7d8/image.webp42"

# Scene 6: Phases in Motion
curl -o "understand-me-video/images/scene-06-phases-motion.webp" \
  "https://evalstate-flux1-schnell.hf.space/gradio_api/file=/tmp/gradio/55a92e69df1fae67b5112b4eba24d27956e4e51b329b1984a6585d8150a7196d/image.webp42"

# Scene 7: The Reunion
curl -o "understand-me-video/images/scene-07-reunion.webp" \
  "https://evalstate-flux1-schnell.hf.space/gradio_api/file=/tmp/gradio/19ea52a45f25e63548c3e4a274af160faabc90683ab54efd335fc0c974cb6b68/image.webp42"

# Scene 8: Agreement & Touch
curl -o "understand-me-video/images/scene-08-agreement-touch.webp" \
  "https://evalstate-flux1-schnell.hf.space/gradio_api/file=/tmp/gradio/60efda6cf2c2dc56aba31ee83ab3d3def9f3ae0e23faf498f2b7d42c0a707428/image.webp42"

# Scene 9: Ripple of Connection
curl -o "understand-me-video/images/scene-09-ripple-connection.webp" \
  "https://evalstate-flux1-schnell.hf.space/gradio_api/file=/tmp/gradio/464821b337a45f88060646fb706ce5ff6de3d936fb91db7eb262d3f4e562f972/image.webp42"

# Scene 10: Final Promise
curl -o "understand-me-video/images/scene-10-final-promise.webp" \
  "https://evalstate-flux1-schnell.hf.space/gradio_api/file=/tmp/gradio/de6663c457cff02bd8164745d8e8991f3e0d8db8ae6736a545382d38658a62d2/image.webp42"

echo "✅ All images downloaded successfully!"
echo "📁 Files saved to: understand-me-video/images/"
echo ""
echo "🎵 Next steps:"
echo "1. Generate audio tracks for each scene"
echo "2. Create video segments combining image + audio"
echo "3. Merge all segments into final 3-minute video"
echo ""
echo "🎬 Ready for video production!"
