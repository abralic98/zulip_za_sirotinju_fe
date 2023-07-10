"use-client";
import { Box } from "@/components/primitives/box/box";
import { Stack } from "@/components/primitives/stack";
import { Heading } from "@/components/ui/Heading";
import { UserIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { useSession } from "next-auth/react";
import { useUploadAvatarMutation } from "@/src/generated/graphql";
import { graphqlClient } from "@/lib/graphqlClient";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { queryClient } from "@/lib/queryClientProvider";
import { useProfile } from "./hooks";
import { ImageBox } from "@/components/ui/ImageBox";

export const UploadAvatar = () => {
  const { data: session, status } = useSession();
  const [hover, setHover] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { getUserAvatar } = useProfile({});
  const [progresspercent, setProgresspercent] = useState(0);
  const updateAvatar = useUploadAvatarMutation(graphqlClient);

  const handleClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleSubmit = () => {

    if (!files) return;
    const file = files[0];
    const fileName = file.name;

    const link = `accounts/${session?.user.id}/${fileName}`;

    const storageRef = ref(storage, link);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setProgresspercent(1);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateAvatar.mutateAsync(
            {
              avatar: {
                filePath: downloadURL,
                fileName: session?.user.id + fileName,
              },
            },
            {
              onSuccess: () => {
                setProgresspercent(0);
                queryClient.refetchQueries(["getUserAvatar", {}]);
              },
              onError: () => {
                setProgresspercent(0);
                toast.error("Avatar allready Exists");
              },
            }
          );
        });
      }
    );
  };

  return (
    <Stack>
      <Box
        onMouseEnter={() => setHover(true)}
        // onMouseLeave={() => setHover(false)}
        style={{
          width: "200px",
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "15px",
          position: "relative",
        }}
        className="bg-gray-800"
      >
        {getUserAvatar?.filePath ? (
          <ImageBox width={300} height={300} src={getUserAvatar.filePath} />
        ) : (
          <UserIcon width={"150px"} height="150px" color="white" />
        )}
        {hover && (
          <Box
            onClick={handleClick}
            style={{
              width: "200px",
              height: "200px",
              position: "absolute",
              opacity: 0.8,
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="bg-gray-900"
          >
            <Box>
              <Heading color="white" type="h3">
                Upload Avatar
              </Heading>
            </Box>
            <input
              ref={fileInputRef}
              style={{
                position: "absolute",
                width: "0.1px",
                height: "0.1px",
                opacity: "0",
                overflow: "hidden",
                cursor: "pointer",
              }}
              onChange={(e) => {
                console.log(e.target.files);
                setFiles(e.target.files);
              }}
              type={"file"}
            />
          </Box>
        )}
      </Box>
      <Button disabled={Boolean(!files)} onClick={handleSubmit}>Submit</Button>
    </Stack>
  );
};
