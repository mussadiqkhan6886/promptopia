import { Post } from "@types";
import PromptCard from "./PromptCard"
import { Suspense } from "react";
import Loading from "./Loading";

interface Props {
  name: string | null;
  desc: string;
  data: Post[];
  handleDelete?: (post: Post) => void;
  handleEdit?: (post: Post) => void;
}


const Profile = ({name, desc, data, handleDelete, handleEdit}: Props) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile </span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <Suspense fallback={<Loading />}>
        <div className="mt-16 prompt_layout">
          {data?.map((post) => (
            <PromptCard 
              key={post._id}
              post={post} 
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)} />
          ))}
        </div>
      </Suspense>
    </section>
  )
}

export default Profile
