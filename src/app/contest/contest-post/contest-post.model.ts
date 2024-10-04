export interface ContestPost {
    id?: number;
    mediaId: string;
    content: string;
    likes: number;
    photoUrl: string;
    timestamp: string;
    mediaType: string;
    contestId: number;
}