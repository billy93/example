import { log } from '@graphprotocol/graph-ts';
import {
  PostCreated,
  ProfileCreated,
  ProfileImageURISet
} from '../generated/LensHub/LensHub';
import {
  Profile,
  Post
} from '../generated/schema';

export function handleProfileCreated(event: ProfileCreated): void {
  const profileId = event.params.profileId.toString();

  log.info('Event [ProfileCreated] has been trigger for profileId: {}', [profileId]);

  let profile = Profile.load(profileId);
  if (profile === null) {
    profile = new Profile(profileId);
  }

  profile.handle = event.params.handle;
  profile.imageURI = profile.imageURI === null ? event.params.imageURI : profile.imageURI;
  profile.save();
}

export function handleProfileImageURISet(event: ProfileImageURISet): void {
  const profileId = event.params.profileId.toString();

  log.info('Event [ProfileImageURISet] has been called for profileId: {}', [profileId]);

  let profile = Profile.load(profileId);
  if (profile === null) {
    profile = new Profile(profileId);
  }

  profile.imageURI = event.params.imageURI;
  profile.save();
}

export function handlePostCreated(event: PostCreated): void {
  const postId = event.params.pubId.toString();
  log.info('Event [PostCreated] has been trigger for postId: {}', [postId]);
  const post = new Post(postId);

  const profileId = event.params.profileId.toString();
  let profile = Profile.load(profileId);
  if (profile === null) {
    profile = new Profile(profileId);
    profile.save();
  }

  post.profile = profile.id;
  post.contentURI = event.params.contentURI;

  post.save();
}
