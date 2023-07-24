
import { Box, Typography, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import millify from "millify";

const useStyles = makeStyles((theme:Theme) => ({
    container: {
        width: 250,
        height: 250,
        // maxWidth: 250,
        // maxHeight: 250,
        display: "flex",
        flex:1,
        flexDirection: "column",
        padding: theme.spacing(1),
        gap: theme.spacing(1),
        borderRadius:8,
        // backgoundColor: "#c7c1c19c",
        backgroundColor:"#fdfcfcf2",
        cursor: "pointer",
        // [theme.breakpoints.down('md')]:{
        //     maxWidth: 150,
        //     maxHeight: 150,
        // },
        "&:hover":{
            boxShadow:"2px 5px 8px #ccc",
            backgroundColor:"#3b7de8f2",
            '& .text':{
                color:"#eef1f6f2"
            },
            '& .count':{
                color:"#ffffffd9",
                textShadow:"2px 0px 2px ##ffffff66",

            },
            background: "linear-gradient(to right,#3b7de8f2, #eef1f6f2)",

        },
        '&:active':{
            transform:"scale(.95)",
            // background: "linear-gradient(to right,#eef1f6f2, #3b7de8f2)",
        },
        "& .center": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            flex: 1,

            '& .count': {
                fontFamily:"'Calibri','Comic Sans MS','Microsoft Sans Serif'",
                fontWeight: '800',
                fontSize:"3rem",
                opacity:.8,
                textShadow:"5px 0px 3px #ccc",
                [theme.breakpoints.down('md')]:{
                    // fontSize:"5em",

                },
                '&::selection':{
                    backgroundColor:"transparent"
                }
            }
        },

        "& .text": {
            color: "grey",
            fontFamily:"'Calibri','Comic Sans MS','Microsoft Sans Serif'",
            fontWeight: "500",
        },
    },
}));

type Props = {
    count: number;
    text: string;
};

const CountNumber = (props: Props) => {
    const { count, text } = props;
    const classes = useStyles();
    return (
        <Box className={classes.container}>
            <Typography className={"text"} variant={"h6"}>
                {text}
            </Typography>
            <Box className={"center"}>
                <span className={"count"}>
                    {millify(count,{space:true,precision:2})}
                </span>
            </Box>
        </Box>
    );
};

export default CountNumber;
