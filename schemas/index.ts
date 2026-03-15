import job from "./job";
import profile from "./profile";
import project from "./project";
import otherProject from "./otherProject";
import post from "./post";
import author from "./author";
import heroe from "./heroe";
import { youtube } from "./youtube";
import { table } from "./table";
import blockContent from "./blockContent";
import quiz from "./quiz";

export const schemaTypes = [
  profile,
  job,
  project,
  otherProject,
  post,
  author,
  heroe,

  // Reference types
  blockContent,
  youtube,
  table,
  quiz,
];
