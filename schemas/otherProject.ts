import { BiPackage } from "react-icons/bi";
import { defineField } from "sanity";

const otherProject = {
  name: "otherProject",
  title: "Other Work",
  description: "Schema for volunteer projects, contract work, and other random projects",
  type: "document",
  icon: BiPackage,
  fields: [
    {
      name: "name",
      title: "Project Name",
      type: "string",
      description: "Enter the name of the project",
      validation: (rule) => rule.required(),
    },
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      validation: (rule) => rule.max(200).required(),
      description: "Brief description of what this project was about",
    }),
    {
      name: "coverImage",
      title: "Screenshot/Cover Image",
      type: "image",
      description: "Upload a screenshot or cover image for this project",
      options: {
        hotspot: true,
        metadata: ["lqip"],
      },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
        },
      ],
      validation: (rule) => rule.required(),
    },
    {
      name: "links",
      title: "Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
              options: {
                list: [
                  { title: "Live Demo", value: "demo" },
                  { title: "Repository", value: "repo" },
                  { title: "Article", value: "article" },
                  { title: "Website", value: "website" },
                  { title: "Other", value: "other" },
                ],
              },
            },
            {
              name: "url",
              title: "URL",
              type: "url",
            },
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "url",
            },
          },
        },
      ],
      description: "Optional links to demo, repo, or related content",
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      description: "Tags to categorize this project (e.g., volunteer, open-source, contract)",
    },
  ],
};

export default otherProject;
