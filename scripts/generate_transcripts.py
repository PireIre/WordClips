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
api_key = "<YOUR_API_KEY>"

# Playlist ID examples
playlist_ids = [
    "PLriLgVg0-Kgzu0Y-Rz2ofUT1E53lUjh_T",
    "PL4A1446D924B9C895",
    "PLTFCM8gfGxuFxE1KlR7l158LhuzaGzE7t",
    "PL8eLeVjI7DnB9MHx5sH1vfFKy2XS6bVJ-",
    "PLoDR8L3mpuoEZdqxOs7uubZ2vQqLFEa3l",
    "PLi3n6z1voQ1arCpQ89izFMwk7lsFrFnq0",
    "PLxifdJ0YCDDyam1S2Myb88E5Eth-sNmXD",
    "PLrAXtmErZgOdP_8GztsuKi9nrraNbKKp4",
    "PLJ-u3QhJA36UyBZ44fryNPIqaZEinN6st",
    "PL1WFx2Og5I4lkRgPWsrxEw6bH4hKn7Ge8",
    "PLpaUYKaHUJ8l7twguEsGBWA_YfgxENvfx",
    "PLD05UeKsUSbr_9TtQORU-cuHjoQUHq5nP",
    "PLosaC3gb0kGCnvkRvp8aOF4OIuGaqDHG8",
]

# Get video IDs from each playlist
youtube_videos = []
playlists_indexed = set()

for playlist_id in playlist_ids:
    try:
        video_ids = get_video_ids(api_key, playlist_id)
        print(f"Got video ids for {playlist_id}")
        youtube_videos.extend(video_ids)
        playlists_indexed.add(playlist_id)
    except Exception as e:
        print(f"Error fetching video IDs for playlist {playlist_id}: {str(e)}")

# Get transcripts
word_index = {}
video_ids_indexed = set()

for video_id in youtube_videos:
    try:
        if video_id in video_ids_indexed:
            continue

        transcript = YouTubeTranscriptApi.get_transcript(video_id, languages=['en'])
        video_ids_indexed.add(video_id)

        for clip in transcript:
            words = re.findall(r'\b\w+\b', clip["text"].lower())
            start_time = math.floor(clip["start"])
            for word in words:
                # Filter out words that are only one character long
                if len(word) > 1:
                    if word not in word_index:
                        word_index[word] = []

                    # Check if the videoId already exists in the word index
                    existing_entry = next((item for item in word_index[word] if
                                           item["videoId"] == video_id), None)

                    if not existing_entry:
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

# Save videoIdsIndexed to a JSON file
with open('videoIdsIndexed.json', 'w', encoding='utf-8') as file:
    json.dump({"showIds": list(video_ids_indexed)}, file, ensure_ascii=False, indent=2)

# Save playlistsIndexed to a JSON file
with open('playlistsIndexed.json', 'w', encoding='utf-8') as file:
    json.dump({"playlistIds": list(playlists_indexed)}, file, ensure_ascii=False, indent=2)

print("Word index saved to YoutubeTranscripts.json")
print("Video IDs indexed saved to videoIdsIndexed.json")
print("Playlist IDs indexed saved to playlistsIndexed.json")

