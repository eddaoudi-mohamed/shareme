import SanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = SanityClient({
  projectId: "vnicc37o",
  dataset: "production",
  apiVersion: "2023-12-27",
  useCdn: true,
  token:
    "skflxYBypO7wh1VADUMKoLS4CH7y0sMpYjLvaLD0iwt8vMziHBw216PDIBYN9XffFSGPSmGa88dVnyftksI2EeVnpsqvkFwilZif0laYdQleoUqfgtkugXQIB02Qao9K8dwV7lUizrDHTbW4oqCMGL6egMTFWw5P51j2XDGvndBUC0SgzooM",
});

const builer = imageUrlBuilder(client);

export const urlFor = (source: any) => builer.image(source);
