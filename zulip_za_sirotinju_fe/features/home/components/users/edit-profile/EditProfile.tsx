import { Box } from '@/components/primitives/box/box'
import { Cluster } from '@/components/primitives/cluster'
import { Split } from '@/components/primitives/split'
import { Dialog } from '@/components/ui/Dialog'
import { Heading } from '@/components/ui/Heading'
import { Input } from '@/components/ui/input'
import React, { Dispatch, FC, SetStateAction } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useProfile } from './hooks/useProfile'
import { UploadAvatar } from './UploadAvatar'

interface Props{
    setOpen: Dispatch<SetStateAction<boolean>>
    open: boolean
}
export const EditProfile:FC<Props> = ({setOpen, open}) => {
    const {getUserProfile, isFetchingGet} = useProfile()
    const form = useForm()
    
  return (
      <Dialog setOpen={setOpen} open={open}>
        <Box
          p={"sm"}
          background={"gray-700"}
          style={{ width: "1000px", height: "500px" }}
          display="flex"
          flexDirection={"col"}
          gap="sm"
        >
          <Heading type="h1" color={'white'}>
            Edit Profile
          </Heading>
          <Split alignItems={'center'}>

          <FormProvider {...form}>
            <form>
                <Input className='w-80' color='white' label='Username' name='username'/>
                <Input className='w-80' color='white' label='Email' name='email'/>
                <Input className='w-80' color='white' label='Email' name='email'/>

            </form>
          </FormProvider>
          <UploadAvatar/>
          </Split>

        </Box>
      </Dialog>
  )
}
