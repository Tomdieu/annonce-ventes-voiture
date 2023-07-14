import React from "react";

import {
    Box,
    Checkbox,
    Typography,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";

import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";

interface FilterProps {
    onPriceFilter: (filter: "asc" | "desc") => void;
    onRecentFilter: (recent: boolean) => void;
    onMarqueSelected: (marque: string) => void;
    onModeleSelected: (modele: string) => void;
    onKilometrageSelected: () => void;
    onTransmissionSelected: (transmission: string) => void;
    onTypeCarburantSelected: (typeCarburant: string) => void;
    onPriceMin: (price: number) => void;
    onPriceMax: (price: number) => void;
}

const Filter: React.FC<FilterProps> = (props: FilterProps) => {
    const {
        onPriceFilter,
        onRecentFilter,
        onPriceMax,
        onPriceMin,
        onTypeCarburantSelected,
        onKilometrageSelected,
        onMarqueSelected,
        onModeleSelected,
        onTransmissionSelected,
    } = props;
    return (
        <Box
            sx={(theme) => ({
                display: "flex",
                flex: 1,
                backgroundColor: "rgba(0,0,0,.2)",
                padding: theme.spacing(0.5),
                width:'100%'
            })}
        >
            <Box
                sx={(theme) => ({
                    padding: theme.spacing(1),
                    width: "100%",
                    borderRadius: theme.shape.borderRadius,
                })}
            >
                {/* <Typography color="text.secondary">Trier</Typography> */}
                <Box>
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">
                            Trier
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                        // value={value}
                        // onChange={handleChange}
                        >
                            <FormControlLabel
                                value="recent"
                                control={<Radio />}
                                label="Plus Recents"
                            />
                            <FormControlLabel
                                value="prix-desc"
                                control={<Radio />}
                                label={
                                    <Typography>
                                        <BiUpArrowAlt size={24} /> Prix
                                    </Typography>
                                }
                            />
                            <FormControlLabel
                                value="prix-asc"
                                control={<Radio />}
                                label={<span><BiDownArrowAlt size={24} /> Prix</span>}
                            />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Box>
                    <Typography>Marque</Typography>
                    <Box>

                    </Box>
                </Box>
                <Box>
                    <Typography>Modele</Typography>
                    <Box>

                    </Box>
                </Box>
                <Box>
                    <Typography>Kilometrage</Typography>
                    <Box>

                    </Box>
                </Box>
                <Box>
                    <Typography>Transmission</Typography>
                    <Box>

                    </Box>
                </Box>
                <Box>
                    <Typography>Carburant</Typography>
                    <Box>

                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Filter;
