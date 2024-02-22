import {
    Checkbox,
    Icon,
    IconButton,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Stack,
} from "@chakra-ui/react";
import React, { ChangeEvent } from "react";
import { MdSettings } from "react-icons/md";
import {
    setPoints,
    setSchoolsAndRec,
    setStateRoads,
    setTrafficCalming,
} from "../../slices/filterSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

export default function SettingsDropdown() {
    const dispatch = useAppDispatch();
    const displayableInfo = useAppSelector(
        (state) => state.filter.displayableInfo,
    );

    const handleStateRoadsCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setStateRoads(event.target.checked));
    };

    const handleSchoolsAndRecCheckbox = (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        dispatch(setSchoolsAndRec(event.target.checked));
    };

    const handleTrafficCalming = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setTrafficCalming(event.target.checked));
    };

    const handleCrashes = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setPoints(event.target.checked));
    };

    return (
        <Popover placement="bottom-end">
            <PopoverTrigger>
                <IconButton
                    colorScheme="gray.500"
                    aria-label="settings"
                    icon={<Icon as={MdSettings} h="40px" w="40px" color="gray.500" />}
                />
            </PopoverTrigger>
            <PopoverContent>
                <PopoverBody>
                    <Stack>
                        <Checkbox
                            isChecked={displayableInfo.stateRoads}
                            onChange={handleStateRoadsCheckbox}
                        >
                            Show State Roads
                        </Checkbox>
                        <Checkbox
                            isChecked={displayableInfo.schoolsAndRec}
                            onChange={handleSchoolsAndRecCheckbox}
                        >
                            Show Schools and Rec Centers
                        </Checkbox>
                        <Checkbox
                            isChecked={displayableInfo.trafficCalming}
                            onChange={handleTrafficCalming}
                        >
                            Show Traffic Calming Devices
                        </Checkbox>
                        <Checkbox
                            isChecked={displayableInfo.points}
                            onChange={handleCrashes}
                        >
                            Show Crashes
                        </Checkbox>
                    </Stack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
}
