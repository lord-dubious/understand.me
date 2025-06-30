#!/bin/bash
# Create individual video segments

echo "🎬 Creating video segments..."


# Scene 1: opening_contrast
ffmpeg -loop 1 -i "images/scene-01-opening_contrast.png" \
       -i "audio/voiceover/scene-01-opening_contrast.wav" \
       -c:v libx264 -t 10 -pix_fmt yuv420p \
       -c:a aac -b:a 192k \
       -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
       "video-segments/segment-01-opening_contrast.mp4"


# Scene 2: private_hesitation
ffmpeg -loop 1 -i "images/scene-02-private_hesitation.png" \
       -i "audio/voiceover/scene-02-private_hesitation.wav" \
       -c:v libx264 -t 14 -pix_fmt yuv420p \
       -c:a aac -b:a 192k \
       -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
       "video-segments/segment-02-private_hesitation.mp4"


# Scene 3: dual_isolation
ffmpeg -loop 1 -i "images/scene-03-dual_isolation.png" \
       -i "audio/voiceover/scene-03-dual_isolation.wav" \
       -c:v libx264 -t 14 -pix_fmt yuv420p \
       -c:a aac -b:a 192k \
       -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
       "video-segments/segment-03-dual_isolation.mp4"


# Scene 4: emotional_visualization
ffmpeg -loop 1 -i "images/scene-04-emotional_visualization.png" \
       -i "audio/voiceover/scene-04-emotional_visualization.wav" \
       -c:v libx264 -t 14 -pix_fmt yuv420p \
       -c:a aac -b:a 192k \
       -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
       "video-segments/segment-04-emotional_visualization.mp4"


# Scene 5: jamie_turn
ffmpeg -loop 1 -i "images/scene-05-jamie_turn.png" \
       -i "audio/voiceover/scene-05-jamie_turn.wav" \
       -c:v libx264 -t 14 -pix_fmt yuv420p \
       -c:a aac -b:a 192k \
       -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
       "video-segments/segment-05-jamie_turn.mp4"


# Scene 6: phases_motion
ffmpeg -loop 1 -i "images/scene-06-phases_motion.png" \
       -i "audio/voiceover/scene-06-phases_motion.wav" \
       -c:v libx264 -t 19 -pix_fmt yuv420p \
       -c:a aac -b:a 192k \
       -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
       "video-segments/segment-06-phases_motion.mp4"


# Scene 7: reunion
ffmpeg -loop 1 -i "images/scene-07-reunion.png" \
       -i "audio/voiceover/scene-07-reunion.wav" \
       -c:v libx264 -t 19 -pix_fmt yuv420p \
       -c:a aac -b:a 192k \
       -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
       "video-segments/segment-07-reunion.mp4"


# Scene 8: agreement_touch
ffmpeg -loop 1 -i "images/scene-08-agreement_touch.png" \
       -i "audio/voiceover/scene-08-agreement_touch.wav" \
       -c:v libx264 -t 19 -pix_fmt yuv420p \
       -c:a aac -b:a 192k \
       -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
       "video-segments/segment-08-agreement_touch.mp4"


# Scene 9: ripple_connection
ffmpeg -loop 1 -i "images/scene-09-ripple_connection.png" \
       -i "audio/voiceover/scene-09-ripple_connection.wav" \
       -c:v libx264 -t 14 -pix_fmt yuv420p \
       -c:a aac -b:a 192k \
       -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
       "video-segments/segment-09-ripple_connection.mp4"


# Scene 10: final_promise
ffmpeg -loop 1 -i "images/scene-10-final_promise.png" \
       -i "audio/voiceover/scene-10-final_promise.wav" \
       -c:v libx264 -t 34 -pix_fmt yuv420p \
       -c:a aac -b:a 192k \
       -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
       "video-segments/segment-10-final_promise.mp4"

