import { GithubUser } from "./github-user.model";

export interface GithubUserResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GithubUser[];
}