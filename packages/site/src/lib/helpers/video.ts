import { deleteDocumentOnline } from 'sveltefirets';
export async function deleteVideo(videoId: string) {
  if (confirm('Delete Video?')) {
    await deleteDocumentOnline(`media/${videoId}`);
    window.location.reload();
  }
}
