import React from "react"
import { Dialog, TransitionProps, Slide, Box, Paper, Button, Typography, Divider } from "@mui/material"

import { makeStyles } from "@mui/styles";
import ApiService from "../../utils/ApiService";
import { useAuth } from "../../context/AuthContext";
import { VoitureTypes } from "types";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles((theme) => ({
    container: {
        width: "800px",
        height: "700px",
        padding: theme.spacing(1),
        backgroundColor: "rgba(171,171,171,.2)"
    },
    imageContainer: {
        display: "flex",
        gap: theme.spacing(1),
        flexWrap: "wrap",
        width: "100%",
        height: "80%",
        alignItems: "center",
        justifyContent: "center",
        // padding: theme.spacing(1),
        overflow: "auto",
        '& .imageBox': {
            width: "100px",
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "100px",
            maxHeight: "100px",
        }
    },
    centerDiv: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80%"
    }
}))

type ImagesTypes = {
    id: number;
    photo: string;
}

type Props = {
    open: boolean;
    multiple: boolean;
    onClose: () => void;
    voitureId: number;
    photoId?: number | null;
    oldImage?: string | null;
    onUpdateImage: (imageId: number, image: ImagesTypes) => void;
    onNewImages: (images: ImagesTypes[]) => void;
}

type ImageTypes = {
    url: string;
}


const PreviewImage = (props: Props) => {

    const { open, multiple, onClose, voitureId, photoId, oldImage, onUpdateImage, onNewImages } = props
    const classes = useStyles()
    const [images, setImages] = React.useState<FileList | null>(null)
    const [previewImages, setPreviewImages] = React.useState<ImageTypes[]>([])
    const { userToken } = useAuth()
    function handleClose() {
        setPreviewImages([])
        setImages(null)
        onClose()
    }
    function selectImage() {
        const photo = document.getElementById("photo");
        if (photo) {
            photo.click()
        }
    }

    React.useEffect(() => {
        if (open) {
            selectImage()
        }
    }, [open])

    React.useEffect(() => {
        if (images) {

            const files = Array.from(images)
            const _images = files.map((img) => ({ url: URL.createObjectURL(img) }))
            setPreviewImages(_images)
        }
        else {
            setPreviewImages([])
        }
    }, [images])

    function handleChange(e: React.ChangeEvent<HTMLInputElement> | undefined) {
        console.log(e)
        if (e) {
            console.log(e.target.files)
            const files = e.target.files;
            setImages(files);
        }
    }
    function handleUpdateImage() {
        if (images) {
            const formData = new FormData();
            const files = Array.from(images)
            formData.append("photo", files[0])

            ApiService.updateVoitureImage(Number(photoId), formData, userToken)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                handleClose()
                onUpdateImage(Number(photoId), data);
                // window.location.reload()
            }).catch(err => console.log(err))
        }
    }
    function handleSaveBulkImages() {
        if (images) {

            const formData = new FormData();
            const files = Array.from(images)
            formData.append("voiture", voitureId.toString());
            files.map((image) => {
                formData.append("images", image);
            })
            ApiService.addVoitureImage(voitureId, formData, userToken)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                handleClose()
                const response: VoitureTypes = data;
                onNewImages(response.images)
                // window.location.reload()
            }).catch(err => console.log(err))
        }
    }
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            maxWidth={"md"}
            onClose={() => handleClose()}

        >
            <Box className={classes.container}>
                <Typography variant={'h5'} textAlign={'center'} gutterBottom>
                    {oldImage ? "Modifier l'image" : "Ajouter des images"}

                </Typography>
                <input id="photo" type="file" accept="image/*" multiple={Boolean(multiple)} onChange={handleChange} style={{ display: 'none' }} />
                <Box sx={{ display: "flex", gap: 3, height: '85%', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ height: "100%", width: "100%" }}>
                        {photoId && (
                            <>
                                <Typography variant={'h6'} textAlign={"center"}>Ancienne image</Typography>
                                <Box className={classes.centerDiv}>
                                    {oldImage && (<img src={oldImage} style={{ maxWidth: '250px' }} />)}

                                </Box>
                            </>
                        )}
                        <Box className={!photoId ? classes.centerDiv : ""}>
                            <Button variant={'contained'} onClick={selectImage}>Selectionner {photoId ? "une" : "(une) ou des"} image</Button>
                        </Box>
                    </Box>
                    <Divider flexItem orientation={'vertical'} ></Divider>
                    <Box sx={{ height: "100%", width: "100%" }}>
                        <Typography variant={'h6'} textAlign={"center"}>Nouvelle Image</Typography>
                        <Box className={classes.imageContainer}>

                            {previewImages.length > 1 && previewImages?.map((prevImage, index) => <Box>
                                <Paper className='imageBox' key={index}>
                                    <img src={prevImage.url} />
                                </Paper>
                            </Box>)}
                            {previewImages.length == 1 && (
                                <img src={previewImages[0].url} style={{ width: 300, height: 300, objectFit: "contain" }} />

                            )}
                        </Box>
                    </Box>

                </Box>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Button variant="contained" color="error" onClick={handleClose}>Fermez</Button>
                    {
                        photoId ? (
                            <Button disabled={previewImages.length !== 1} variant="contained" color="success" onClick={handleUpdateImage}>Update image</Button>
                        ) : (<>
                            {(images && images.length > 0) && <Button onClick={handleSaveBulkImages} variant="contained" color={'success'}>Sauegarder ces images</Button>}
                        </>)
                    }
                </Box>


            </Box>
        </Dialog>
    )
}

export default PreviewImage