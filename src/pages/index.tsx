import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { Auth } from "../components/Auth";
import { Layout } from "../components/Layout";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";
import {
  ChangeEventHandler,
  FormEventHandler,
  useState,
} from "react";
import Image from "next/image";

const Home: NextPage = () => {
  const [imageSrc, setImageSrc] = useState('');
  const [uploadData, setUploadData] = useState<File>();

  // ファイルが選択された時
  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (
    changeEvent
  ) => {
    const reader = new FileReader();
    reader.onload = (onLoadEvent) => {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };
    reader.readAsDataURL(changeEvent.target.files[0]);
  };

  // フォームが送信された時
  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name}) => name === "file"
    );
    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "my-uploads");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/de0axgzvx/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    setImageSrc(data.secure_url);
    setUploadData(data);
  };

  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout title="Login">
        <Auth />
      </Layout>
    );
  }

  return (
    <Layout title="Todo App">
      <button onClick={() => signOut()}>ログアウト</button>
      <p>{session.user?.name}</p>
      <TaskForm />
      <TaskList />

      <form method="post" onSubmit={handleOnSubmit}>
        <input
          type="file"
          name="file"
          onChange={handleOnChange}
          accept="image/*"
        />

        <Image src={imageSrc} width={100} height={100} alt="画像" />

        {imageSrc && !uploadData && (
          <button disabled={!imageSrc}>
            画像アップロード
          </button>
        )}

        {uploadData && (
          <code>
            <pre>{JSON.stringify(uploadData, null, 2)}</pre>
          </code>
        )}
      </form>
    </Layout>
  );
};

export default Home;
