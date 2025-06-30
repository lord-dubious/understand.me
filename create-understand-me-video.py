#!/usr/bin/env python3
"""
Understand.me Video Production Script
Creates a 3-minute promotional video with 8-second scene spacing
"""

import os
import subprocess
import json
from pathlib import Path

# Video configuration
VIDEO_CONFIG = {
    "total_duration": 180,  # 3 minutes
    "scene_spacing": 8,     # 8 seconds between scenes
    "fps": 30,
    "resolution": "1920x1080",
    "audio_sample_rate": 44100
}

# Scene definitions with timing and content
SCENES = [
    {
        "id": 1,
        "name": "opening_contrast",
        "start_time": 0,
        "duration": 10,
        "voiceover": "When the words you need hang in the air… misunderstandings grow.",
        "description": "EXT. CITY PARK — DAWN. Dew-glazed grass, golden rays filtering through oak branches.",
        "tone": "warm, gender-neutral, soft, breathy"
    },
    {
        "id": 2,
        "name": "private_hesitation", 
        "start_time": 11,
        "duration": 14,
        "voiceover": "Imagine an impartial guide—always ready, always listening.",
        "description": "INT. ALEX'S APARTMENT — MORNING. Sunlight through sheer curtains, wooden desk.",
        "tone": "calm, reassuring, gentle rise on 'always'"
    },
    {
        "id": 3,
        "name": "dual_isolation",
        "start_time": 26,
        "duration": 14,
        "voiceover": "I felt overlooked when our plans changed last minute…",
        "description": "SPLIT SCREEN. Alex at desk, Jamie in bedroom, intimate character voices.",
        "tone": "character voice - Alex, anxious but honest"
    },
    {
        "id": 4,
        "name": "emotional_visualization",
        "start_time": 41,
        "duration": 14,
        "voiceover": "An AI that sees beyond words—capturing the emotion beneath.",
        "description": "GRAPHIC INSERT. Glowing waveform animates from deep blue to amber.",
        "tone": "reflective, intimate, echo on 'sees beyond words'"
    },
    {
        "id": 5,
        "name": "jamie_turn",
        "start_time": 56,
        "duration": 14,
        "voiceover": "I was scared you'd be frustrated if I spoke up…",
        "description": "INT. COFFEE SHOP. Jamie's reflection in glass, phone to ear.",
        "tone": "character voice - Jamie, vulnerable but hopeful"
    },
    {
        "id": 6,
        "name": "phases_motion",
        "start_time": 71,
        "duration": 19,
        "voiceover": "Five phases—set intent, speak freely, reflect, truly listen, then find solutions side by side.",
        "description": "MONTAGE. Multiple panels showing the five-phase process.",
        "tone": "steady, encouraging, gentle uplift on 'side by side'"
    },
    {
        "id": 7,
        "name": "reunion",
        "start_time": 91,
        "duration": 19,
        "voiceover": "No screens. No judgment. Just two hearts guided by gentle AI.",
        "description": "EXT. LAKESIDE DOCK — GOLDEN HOUR. Alex and Jamie approach from opposite ends.",
        "tone": "warm, intimate, soft falloff on 'gentle AI'"
    },
    {
        "id": 8,
        "name": "agreement_touch",
        "start_time": 111,
        "duration": 19,
        "voiceover": "I'm grateful we can move forward—together.",
        "description": "CLOSE-UP. Hands meet on table, candlelight flickering.",
        "tone": "character voice - Alex, grateful and peaceful"
    },
    {
        "id": 9,
        "name": "ripple_connection",
        "start_time": 131,
        "duration": 14,
        "voiceover": "Small moments—big leaps toward understanding.",
        "description": "QUICK CUTS. Friends laughing, colleagues shaking hands, family conversation.",
        "tone": "uplifting, hopeful, whisper 'small moments', confident 'big leaps'"
    },
    {
        "id": 10,
        "name": "final_promise",
        "start_time": 146,
        "duration": 34,
        "voiceover": "Understand-me. Your AI companion for heartfelt conversations—anytime, anywhere.",
        "description": "EXT. DOCK — SUNSET. Silhouetted figures, text overlays, logo reveal.",
        "tone": "invitational, resonant, rise through 'anytime, anywhere'"
    }
]

def create_directory_structure():
    """Create the video production directory structure"""
    dirs = [
        "understand-me-video/images",
        "understand-me-video/audio/voiceover",
        "understand-me-video/audio/background",
        "understand-me-video/video-segments", 
        "understand-me-video/final"
    ]
    
    for dir_path in dirs:
        Path(dir_path).mkdir(parents=True, exist_ok=True)
    
    print("✅ Directory structure created")

def generate_scene_images():
    """Generate images for each scene using available tools"""
    print("🎨 Generating scene images...")
    
    # This would integrate with HF MCP server or FAL AI
    # For now, create placeholder information
    
    image_prompts = []
    for scene in SCENES:
        prompt = f"{scene['description']} Cinematic, therapeutic atmosphere, warm lighting, professional quality"
        image_prompts.append({
            "scene_id": scene['id'],
            "name": scene['name'],
            "prompt": prompt,
            "output_path": f"understand-me-video/images/scene-{scene['id']:02d}-{scene['name']}.png"
        })
    
    # Save prompts for manual generation
    with open("understand-me-video/image-generation-prompts.json", "w") as f:
        json.dump(image_prompts, f, indent=2)
    
    print(f"📝 Image prompts saved to image-generation-prompts.json")
    return image_prompts

def create_audio_scripts():
    """Create audio scripts for TTS generation"""
    print("🎵 Creating audio scripts...")
    
    audio_scripts = []
    for scene in SCENES:
        script = {
            "scene_id": scene['id'],
            "name": scene['name'],
            "text": scene['voiceover'],
            "tone_direction": scene['tone'],
            "duration": scene['duration'],
            "output_path": f"understand-me-video/audio/voiceover/scene-{scene['id']:02d}-{scene['name']}.wav"
        }
        audio_scripts.append(script)
    
    # Save scripts for TTS generation
    with open("understand-me-video/audio-scripts.json", "w") as f:
        json.dump(audio_scripts, f, indent=2)
    
    print(f"📝 Audio scripts saved to audio-scripts.json")
    return audio_scripts

def create_video_timeline():
    """Create the video timeline and segment specifications"""
    print("🎬 Creating video timeline...")
    
    timeline = {
        "total_duration": VIDEO_CONFIG["total_duration"],
        "fps": VIDEO_CONFIG["fps"],
        "resolution": VIDEO_CONFIG["resolution"],
        "scenes": []
    }
    
    for scene in SCENES:
        scene_spec = {
            "id": scene['id'],
            "name": scene['name'],
            "start_time": scene['start_time'],
            "duration": scene['duration'],
            "end_time": scene['start_time'] + scene['duration'],
            "image_path": f"images/scene-{scene['id']:02d}-{scene['name']}.png",
            "audio_path": f"audio/voiceover/scene-{scene['id']:02d}-{scene['name']}.wav",
            "output_path": f"video-segments/segment-{scene['id']:02d}-{scene['name']}.mp4"
        }
        timeline["scenes"].append(scene_spec)
    
    # Save timeline
    with open("understand-me-video/video-timeline.json", "w") as f:
        json.dump(timeline, f, indent=2)
    
    print(f"📝 Video timeline saved to video-timeline.json")
    return timeline

def create_ffmpeg_scripts():
    """Create FFmpeg scripts for video production"""
    print("🔧 Creating FFmpeg scripts...")
    
    # Script to create individual segments
    segment_script = """#!/bin/bash
# Create individual video segments

echo "🎬 Creating video segments..."

"""
    
    for scene in SCENES:
        segment_script += f"""
# Scene {scene['id']}: {scene['name']}
ffmpeg -loop 1 -i "images/scene-{scene['id']:02d}-{scene['name']}.png" \\
       -i "audio/voiceover/scene-{scene['id']:02d}-{scene['name']}.wav" \\
       -c:v libx264 -t {scene['duration']} -pix_fmt yuv420p \\
       -c:a aac -b:a 192k \\
       -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \\
       "video-segments/segment-{scene['id']:02d}-{scene['name']}.mp4"

"""
    
    # Script to merge all segments
    merge_script = """#!/bin/bash
# Merge all video segments into final video

echo "🔗 Merging video segments..."

# Create file list for concatenation
cat > segment-list.txt << EOF
"""
    
    for scene in SCENES:
        merge_script += f"file 'video-segments/segment-{scene['id']:02d}-{scene['name']}.mp4'\n"
    
    merge_script += """EOF

# Concatenate all segments
ffmpeg -f concat -safe 0 -i segment-list.txt \\
       -c copy \\
       "final/understand-me-promotional-video-3min.mp4"

echo "✅ Final video created: final/understand-me-promotional-video-3min.mp4"
"""
    
    # Save scripts
    with open("understand-me-video/create-segments.sh", "w") as f:
        f.write(segment_script)
    
    with open("understand-me-video/merge-segments.sh", "w") as f:
        f.write(merge_script)
    
    # Make scripts executable
    os.chmod("understand-me-video/create-segments.sh", 0o755)
    os.chmod("understand-me-video/merge-segments.sh", 0o755)
    
    print("📝 FFmpeg scripts created and made executable")

def main():
    """Main video production workflow"""
    print("🎬 Starting Understand.me Video Production")
    print("=" * 50)
    
    # Create directory structure
    create_directory_structure()
    
    # Generate scene specifications
    image_prompts = generate_scene_images()
    audio_scripts = create_audio_scripts()
    timeline = create_video_timeline()
    
    # Create production scripts
    create_ffmpeg_scripts()
    
    print("\n" + "=" * 50)
    print("🎉 Video production setup complete!")
    print("\n📋 Next steps:")
    print("1. Generate images using the prompts in image-generation-prompts.json")
    print("2. Generate audio using the scripts in audio-scripts.json")
    print("3. Run ./create-segments.sh to create individual video segments")
    print("4. Run ./merge-segments.sh to create the final 3-minute video")
    print("\n📁 All files are organized in the understand-me-video/ directory")
    print("🎯 Final output: understand-me-video/final/understand-me-promotional-video-3min.mp4")

if __name__ == "__main__":
    main()
