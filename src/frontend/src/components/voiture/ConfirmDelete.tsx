import React from "react"
import { Dialog, TransitionProps, Slide, Box, Button, Typography, Divider } from "@mui/material"

import ApiService from "../../utils/ApiService";
import { useAuth } from "../../context/AuthContext";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
    open: boolean;
    photoId:number;
    onClose:()=>void;
    photo:string;
    onDelete:(photoId:number)=>void;
}

const ConfirmDelete = (props:Props) =>{
    const {open,photoId,onClose,photo,onDelete} = props;
    const {userToken} = useAuth()
    function handleClose(){
        onClose()
    }
    function handleDelete(){
        ApiService.deleteVoitureImage(photoId,userToken).then(()=>{
            // window.location.reload()
            onDelete(photoId)
            handleClose()
        }).catch(err=>console.log(err))
    }
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            maxWidth={"md"}
            onClose={handleClose}

        >
            <Box sx={(theme)=>({width:"300px",height:"300px",padding:theme.spacing(2)})}>
                <Typography variant="h6" gutterBottom>Voulezvous vraimen supprimez ?</Typography>
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",mb:1}}>
                    <img src={photo} style={{width:200,height:200}}/>
                </Box>
                <Divider/>
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",mt:1}}>
                    <Button onClick={handleClose} variant="contained">Close</Button>
                    <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
                </Box>
            </Box>
        </Dialog>
    )
}

export default ConfirmDelete