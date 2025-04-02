import React, { useState } from "react";
import { Modal, Box, Button } from "@mui/material";
import { SandpackProvider, SandpackPreview } from "@codesandbox/sandpack-react";

interface DynamicIframeModalProps {
  code: string;
}

const DynamicIframeModal: React.FC<DynamicIframeModalProps> = ({ code }) => {
  const [open, setOpen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleIframeReload = () => setIframeKey((prevKey) => prevKey + 1);

  return (
    <>
      {/* Button to open the modal */}
      <Button onClick={handleOpen} variant="contained">
        Open Preview
      </Button>

      {/* Modal for displaying the preview */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "80%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Container to make the preview take full space */}
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              height: '100%'
            }}
          >
            <SandpackProvider
              template="static"
              style={{ height: '100%'}}
              files={{
                "/index.html": { code: code, active: true },
              }}
            >
              <Box
                sx={{
                  flexGrow: 1, // Takes full height
                  display: "flex",
                  flexDirection: "column",
                   height: '100%'
                }}
              >
                <SandpackPreview
                  key={iframeKey}
                  style={{
                    flexGrow: 1,
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                />
              </Box>
            </SandpackProvider>
          </Box>

          {/* Buttons below */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button onClick={handleClose} variant="outlined">
              Close
            </Button>
            <Button onClick={handleIframeReload} variant="contained">
              Reload
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default DynamicIframeModal;
