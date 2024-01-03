import json
import requests
from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled, VideoUnavailable
import math
import re

# Function to get video IDs from a YouTube playlist
def get_video_ids(api_key, playlist_id):
    base_url = "https://www.googleapis.com/youtube/v3/playlistItems"
    params = {
        "part": "contentDetails",
        "playlistId": playlist_id,
        "key": api_key,
        "maxResults": 1,  # Adjust the number based on your needs
    }

    video_ids = []

    while True:
        response = requests.get(base_url, params=params)
        data = response.json()

        for item in data.get("items", []):
            video_ids.append(item["contentDetails"]["videoId"])

        next_page_token = data.get("nextPageToken")
        if not next_page_token:
            break

        params["pageToken"] = next_page_token

    return video_ids

# Your YouTube API Key
api_key = "AIzaSyD6c74kC76ggrCNhY17mclQPhP_I_HzULE"

# Playlist ID examples
playlist_ids = [
    "PLriLgVg0-Kgzu0Y-Rz2ofUT1E53lUjh_T",
]

# Get video IDs from each playlist
youtube_videos = []
for playlist_id in playlist_ids:
    try:
        video_ids = get_video_ids(api_key, playlist_id)
        print(f"Got video ids for {playlist_id}")
        youtube_videos.extend(video_ids)
    except Exception as e:
        print(f"Error fetching video IDs for playlist {playlist_id}: {str(e)}")

# Get transcripts
word_index = {}

for video_id in youtube_videos:
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id, languages=['en'])
        for clip in transcript:
            words = re.findall(r'\b\w+\b', clip["text"].lower())
            start_time = math.floor(clip["start"])
            for word in words:
                if word not in word_index:
                    word_index[word] = []
                # Check if the videoId already exists in the word index
                video_exists = next((item for item in word_index[word] if item["videoId"] == video_id), None)
                if video_exists:
                    # If the videoId exists, append the start time to the existing start array
                    video_exists["start"].append(start_time)
                else:
                    # If the videoId does not exist, create a new entry
                    word_index[word].append({
                        "videoId": video_id,
                        "start": [start_time]
                    })
    except (TranscriptsDisabled, VideoUnavailable):
        print(f"Error for video {video_id}: Transcripts are disabled, video is unavailable, private, or does not exist.")
    except Exception as e:
        print(f"Error fetching transcript for video {video_id}: {str(e)}")

# Save word index to a JSON file
with open('YoutubeTranscripts.json', 'w', encoding='utf-8') as file:
    json.dump(word_index, file, ensure_ascii=False, indent=2)

print("Word index saved to YoutubeTranscripts.json")