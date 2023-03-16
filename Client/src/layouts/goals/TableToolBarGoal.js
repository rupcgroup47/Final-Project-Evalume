import { useState } from "react";
import {
  Fade,
  IconButton,
  InputBase,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

export default function TableToolbarGoal({
  // Search
  searchInput,
  setSearchInput,

}) {
 const [showSearchButton, setShowSearchButton] = useState(false);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "16px 16px  8px 16px",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Fade in={!showSearchButton}>
            <Typography variant="h5" fontWeight={600}>
              יעדים
            </Typography>
          </Fade>

          <Fade in={showSearchButton} mountOnEnter unmountOnExit>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                pl: 1,

                bgcolor: "rgba(0,0,0,.05)",
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                width: "max(100%, 250px)",
                maxWidth: 400,
              }}
            >
              <SearchIcon color="disabled" />

              <InputBase
                sx={{
                  pl: 1,
                }}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="חיפוש"
              />

              <IconButton
                type="button"
                sx={{ p: 1 }}
                aria-label="search"
                size="small"
                onClick={() => {
                  setSearchInput("");
                  setShowSearchButton(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Fade>
        </div>

        <Box style={{ display: "flex" }}>

          <Tooltip title="חיפוש">
            <IconButton onClick={() => setShowSearchButton((e) => !e)}>
              <SearchIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </>
  );
}
