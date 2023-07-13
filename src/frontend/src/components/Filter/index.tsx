import React from "react"

import { Box, Checkbox, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel,Radio} from "@mui/material"


interface FilterProps {

}

const Filter: React.FC<FilterProps> = (props: FilterProps) => {
    return (
        <Box sx={(theme) => ({ display: "flex", flex: 1,backgroundColor:"rgba(0,0,0,.2)",padding:theme.spacing(.5) })}>
            <Box sx={(theme)=>({padding:theme.spacing(1),width:"100%",borderRadius:theme.shape.borderRadius})}>
                <Typography color="text.secondary">Trier</Typography>
                <Box>
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">Trier</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            // value={value}
                            // onChange={handleChange}
                        >
                            <FormControlLabel value="recent" control={<Radio />} label="Plus Recents" />
                            <FormControlLabel value="prix-desc" control={<Radio />} label="Prix" />
                            <FormControlLabel value="prix-asc" control={<Radio />} label="Prix" />

                        </RadioGroup>
                    </FormControl>
                </Box>
            </Box>
        </Box>
    )
}

export default Filter;