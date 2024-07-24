import React from "react"
import { Chip, IconButton, Tooltip } from "@mui/material";
import FiberManualRecordTwoToneIcon from '@mui/icons-material/FiberManualRecordTwoTone';

interface ILiveButtonProps {
    onSyncLive: () => void;
    paused: boolean;
    isSync: boolean;
}

export const LiveButton: React.FC<ILiveButtonProps> = ({ paused, onSyncLive, isSync }) => {
    return (
        <div className="live-button text-base">
            <Tooltip title="Synchronize with live" placement="top-end">
                <div className="live-sync">
                    <IconButton
                        aria-label={paused ? 'play' : 'pause'}
                        onClick={() => onSyncLive()}
                    >
                        <FiberManualRecordTwoToneIcon
                            className={`${isSync ? 'text-red-500' : 'text-grey-500'}`}
                        />
                    </IconButton>
                    <Chip label="Live" color={`${isSync ? "error" : "default"}`} variant="outlined" />
                </div>
            </Tooltip>
        </div>
    )
}