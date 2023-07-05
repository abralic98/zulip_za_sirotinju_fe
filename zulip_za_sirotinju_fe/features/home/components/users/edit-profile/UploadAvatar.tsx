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

export const UploadAvatar = () => {
  const { data: session, status } = useSession();
  const [hover, setHover] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const updateAvatar = useUploadAvatarMutation(graphqlClient);

  const handleClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleSubmit = () => {
    console.log('kita', files);
    
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
                fileName: fileName,
              },
            },
            {
              onSuccess: () => {
                setProgresspercent(0);
              },
              onError: () => {
                alert("Ime slike postoji");
                setProgresspercent(0);
              },
            }
          );
        });
      }
    );
  };
  console.log(files);
  
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
        <UserIcon width={"150px"} height="150px" color="white" />
        {hover && (
          <Box
            onClick={handleClick}
            style={{
              width: "200px",
              height: "200px",
              position: "absolute",
              opacity: 0.8,
              borderRadius: "15px",
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
            {/* <input
              ref={fileInputRef}
              style={{
                position: "absolute",
                width: "0.1px",
                height: "0.1px",
                opacity: "0",
                overflow: "hidden",
                cursor: "pointer",
              }}
              onChange={(e)=>{
                console.log(e.target.files);
                
              }}
              type={"file"}
              /> */}
            <input type="file" onChange={(e)=>{
              setFiles(e.target.files)

            }} />
          </Box>
        )}
      </Box>
        <Button onClick={handleSubmit}>Submit</Button>
    </Stack>
  );
};
