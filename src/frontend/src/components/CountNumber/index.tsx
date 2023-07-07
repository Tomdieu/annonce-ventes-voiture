import React from "react";

import { Box, Paper, Typography, ButtonBase, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        width: 300,
        height: 200,
        display: "flex",
        flexDirection: "row",
        padding: theme.spacing(1),
        gap: 2,
        backgoundColor: "#c7c1c19c",
        '& .center': {
            display: "flex", alignItems: "center", justifyContent: "center",
            flex: 1
        },
        '& .vertical': {
            flexDirection: "column",
            '& .count': {
                color: "#6aa9fbe3",
                textShadow: "3px 2px 5px #c4c0c0e3",
                fontSize: "6rem"
            },
            '& .text': {
                color: "#3f86e4e3"
            }
        }
    },
}));

type Props = {
    icon?: React.ReactNode;
    count: number;
    text: string;
};

const CountNumber = (props: Props) => {
    const { icon, count, text } = props;
    const classes = useStyles();
    return (
        <ButtonBase component={Paper} sx={{ backgoundColor: "#99b6dbe3" }} className={classes.container}>
            {icon && (
                <>
                    <Box
                        className={'center'}
                    >
                        {icon}
                    </Box>
                    <Divider flexItem={true} orientation={"vertical"} />
                </>
            )}

            <Box className={'center vertical'}>
                <Typography className={'count'} variant={"h1"} textAlign={'center'}>{count}</Typography>
                <Typography className={'text'} variant={"h5"} textAlign={'center'}>{text}</Typography>
            </Box>
        </ButtonBase>
    );
};

export default CountNumber;
