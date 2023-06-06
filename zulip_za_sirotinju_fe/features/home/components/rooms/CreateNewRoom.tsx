import { Box } from "@/components/primitives/box/box";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/Dialog";
import { Heading } from "@/components/ui/Heading";
import { Input } from "@/components/ui/input";
import React, { useRef, useState } from "react";

export const CreateNewRoom = () => {
  const [open, setOpen] = useState(false)
  const ref = useRef()
  return (
    <>
      <Button onClick={()=>setOpen(true)} type='button'>CreateNewRoom</Button>
      {open &&
      <Dialog setOpen={setOpen} open={open}>
        <Box background={'white'} style={{width:'500px', height:'300px'}}>
          <Heading type="h1" color={'white'}>Create New Room</Heading>
          <Input />
        </Box>
      </Dialog>
       }
    </>
  );
};
