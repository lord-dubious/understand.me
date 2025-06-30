#!/usr/bin/env python3
"""
Generate Understand.me videos using fal-ai/minimax/hailuo-02/pro/text-to-video
with consistent seed for all 10 scenes
"""

import fal_client
import os
import time
import requests

# Consistent seed for all videos
SEED = 42

# Video scenes with 8-second spacing
SCENES = [
    {
        "id": 1,
        "name": "opening_contrast",
        "prompt": "EXT. CITY PARK — DAWN. Dew-glazed grass, golden rays filtering through oak branches. A light mist hugs the ground. ALEX (late 20s, soft gray hoodie, anxious posture) sits on a wrought-iron bench. JAMIE (mid-20s, navy sweater, arms folded) stands ten feet away beneath a lamppost's halo. Wide shot slowly dollies in from the bench to frame both in split depth. Cinematic, warm morning light, peaceful park setting, therapeutic atmosphere.",
        "duration": 10
    },
    {
        "id": 2, 
        "name": "private_hesitation",
        "prompt": "INT. ALEX'S APARTMENT — MORNING. Sunlight through sheer curtains, a wooden desk cluttered with notebooks, a single potted fern. Alex paces barefoot, hand through his hair, phone dark in his palm. Over-the-shoulder on Alex's reflection in a framed mirror as he finally taps his earbud. Warm interior lighting, cozy apartment, therapeutic atmosphere.",
        "duration": 14
    },
    {
        "id": 3,
        "name": "dual_isolation", 
        "prompt": "SPLIT SCREEN. Left: ALEX sits at his desk, eyes closed, earbud LED pulsing. Right: JAMIE in her bedroom—cross-legged on the bed, steaming mug on nightstand. Ambient noise drops; intimate character voices. Dual isolation, therapeutic colors, calming blue and green tones.",
        "duration": 14
    },
    {
        "id": 4,
        "name": "emotional_visualization",
        "prompt": "GRAPHIC INSERT OVER BLACK. A glowing waveform animates from deep blue to amber in time with voice. Abstract visualization, flowing energy patterns, AI emotion detection interface, therapeutic technology, peaceful digital art, calming gradient colors.",
        "duration": 14
    },
    {
        "id": 5,
        "name": "jamie_turn",
        "prompt": "INT. COFFEE SHOP — LATE MORNING. Light jazz; warm wood tables; rain-damp street outside. Jamie's reflection in the glass. She holds her phone to her ear, shoulders looser than before. Slow push-in from coffee mug to Jamie's face. Cozy cafe atmosphere, therapeutic lighting.",
        "duration": 14
    },
    {
        "id": 6,
        "name": "phases_motion",
        "prompt": "SERIES OF SHOTS (each ~2s): Close-up: Alex closing his eyes, stating intent. Medium: Both in separate rooms watching earbuds. Graphic pulse: text 'Do I have that right?' overlays waveform. Jamie nodding in relief. Hands sketching a shared checklist on paper. Five-phase mediation process montage.",
        "duration": 19
    },
    {
        "id": 7,
        "name": "reunion",
        "prompt": "EXT. LAKESIDE DOCK — GOLDEN HOUR. Rippling water, rose-gold sky, fireflies flickering. A small wooden table holds two lanterns. Alex and Jamie approach from opposite ends, earbuds still in, phones tucked away. Crane shot arcs from above, descending to eye-level as they meet center.",
        "duration": 19
    },
    {
        "id": 8,
        "name": "agreement_touch",
        "prompt": "CLOSE-UP: Their hands meet on the table, candlelight flickering over joined fingers. Natural ambient sounds return—water lapping, distant birds. Intimate connection moment, therapeutic resolution, peaceful agreement, warm candlelight, emotional healing.",
        "duration": 19
    },
    {
        "id": 9,
        "name": "ripple_connection", 
        "prompt": "QUICK CUTS (~1.5s each): Two friends on a rooftop, earbuds in, breaking into laughter. Office colleagues shaking hands in a bright conference room. Parent and teen sharing a quiet sofa conversation. Multiple therapeutic connections, diverse relationships.",
        "duration": 14
    },
    {
        "id": 10,
        "name": "final_promise",
        "prompt": "EXT. DOCK — SUNSET. Silhouetted figures against glowing horizon; lantern embers drift upward. TEXT OVERLAY (fade-ins): 'Speak Your Truth.' 'Be Heard.' 'Grow Together.' Final: 'Understand-me' logo and tagline. Inspirational ending, therapeutic promise, peaceful resolution.",
        "duration": 34
    }
]

def generate_video_with_minimax_hailuo(scene):
    """Generate video using fal-ai/minimax/hailuo-02/pro/text-to-video"""
    
    print(f"🎬 Generating Scene {scene['id']}: {scene['name']}")
    print(f"📝 Prompt: {scene['prompt'][:100]}...")
    
    try:
        # Submit to fal-ai/minimax/hailuo-02/pro/text-to-video
        handler = fal_client.submit(
            "fal-ai/minimax/hailuo-02/pro/text-to-video",
            arguments={
                "prompt": scene['prompt'],
                "seed": SEED,  # Consistent seed for all videos
                "duration": scene['duration'],
                "aspect_ratio": "16:9",
                "resolution": "1080p",  # Pro version supports 1080p
                "fps": 30
            }
        )
        
        print(f"⏳ Processing video for scene {scene['id']}...")
        result = handler.get()
        
        # Save video
        video_url = result.get("video", {}).get("url")
        if video_url:
            output_path = f"understand-me-video/video-segments/scene-{scene['id']:02d}-{scene['name']}.mp4"
            
            # Download video
            response = requests.get(video_url)
            response.raise_for_status()
            
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            with open(output_path, "wb") as f:
                f.write(response.content)
            
            print(f"✅ Scene {scene['id']} saved: {output_path}")
            return output_path
        else:
            print(f"❌ Failed to get video URL for scene {scene['id']}")
            return None
            
    except Exception as e:
        print(f"❌ Error generating scene {scene['id']}: {str(e)}")
        return None

def create_final_video_with_spacing():
    """Merge all video segments with 8-second spacing"""
    
    print("\n🔗 Creating final video with 8-second spacing...")
    
    # Create directory for spacing videos
    os.makedirs("understand-me-video/spacing", exist_ok=True)
    
    # Create 8-second black spacing video
    spacing_cmd = """ffmpeg -f lavfi -i color=black:size=1920x1080:duration=8:rate=30 \
                     -c:v libx264 -pix_fmt yuv420p \
                     understand-me-video/spacing/black-8sec.mp4 -y"""
    os.system(spacing_cmd)
    
    # Create FFmpeg concat file with timing
    concat_content = ""
    total_duration = 0
    
    for i, scene in enumerate(SCENES):
        video_path = f"video-segments/scene-{scene['id']:02d}-{scene['name']}.mp4"
        
        # Add scene
        concat_content += f"file '{video_path}'\n"
        total_duration += scene['duration']
        
        # Add 8-second spacing (except for last scene)
        if i < len(SCENES) - 1:
            concat_content += f"file 'spacing/black-8sec.mp4'\n"
            total_duration += 8
    
    # Save concat file
    with open("understand-me-video/concat-list.txt", "w") as f:
        f.write(concat_content)
    
    # Create final video
    final_output = "understand-me-video/final/understand-me-promotional-video-3min.mp4"
    os.makedirs(os.path.dirname(final_output), exist_ok=True)
    
    cmd = f"""ffmpeg -f concat -safe 0 -i understand-me-video/concat-list.txt \
              -c copy -y {final_output}"""
    os.system(cmd)
    
    print(f"🎉 Final video created: {final_output}")
    print(f"⏱️  Total duration: ~{total_duration} seconds ({total_duration/60:.1f} minutes)")

def main():
    """Main video generation workflow"""
    print("🎬 Understand.me Video Generation with MiniMax Hailuo-02 Pro")
    print("=" * 60)
    print(f"🎯 Using consistent seed: {SEED}")
    print(f"📊 Total scenes: {len(SCENES)}")
    print(f"⏱️  8-second spacing between scenes")
    print(f"🎥 Model: fal-ai/minimax/hailuo-02/pro/text-to-video")
    print("=" * 60)
    
    # Create output directories
    os.makedirs("understand-me-video/video-segments", exist_ok=True)
    os.makedirs("understand-me-video/final", exist_ok=True)
    
    # Generate all videos
    generated_videos = []
    for scene in SCENES:
        video_path = generate_video_with_minimax_hailuo(scene)
        if video_path:
            generated_videos.append(video_path)
        
        # Small delay between requests to avoid rate limiting
        time.sleep(5)
    
    print(f"\n✅ Generated {len(generated_videos)} out of {len(SCENES)} videos")
    
    if len(generated_videos) == len(SCENES):
        create_final_video_with_spacing()
        print("\n🎉 Complete 3-minute promotional video ready!")
        print("📁 Final output: understand-me-video/final/understand-me-promotional-video-3min.mp4")
    else:
        print("⚠️  Some videos failed to generate. Check individual scenes.")
        print("💡 You can re-run this script to retry failed scenes.")

if __name__ == "__main__":
    main()
