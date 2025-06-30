#!/bin/bash
# Merge all video segments into final video

echo "🔗 Merging video segments..."

# Create file list for concatenation
cat > segment-list.txt << EOF
file 'video-segments/segment-01-opening_contrast.mp4'
file 'video-segments/segment-02-private_hesitation.mp4'
file 'video-segments/segment-03-dual_isolation.mp4'
file 'video-segments/segment-04-emotional_visualization.mp4'
file 'video-segments/segment-05-jamie_turn.mp4'
file 'video-segments/segment-06-phases_motion.mp4'
file 'video-segments/segment-07-reunion.mp4'
file 'video-segments/segment-08-agreement_touch.mp4'
file 'video-segments/segment-09-ripple_connection.mp4'
file 'video-segments/segment-10-final_promise.mp4'
EOF

# Concatenate all segments
ffmpeg -f concat -safe 0 -i segment-list.txt \
       -c copy \
       "final/understand-me-promotional-video-3min.mp4"

echo "✅ Final video created: final/understand-me-promotional-video-3min.mp4"
