import React, { useState } from "react";
import { 
  Modal, 
  Box, 
  Button, 
  IconButton,
  Typography,
  Tabs,
  Tab,
  Paper
} from "@mui/material";
import { 
  Close, 
  Refresh,
  Code,
  Visibility
} from "@mui/icons-material";
import { SandpackProvider, SandpackPreview, SandpackCodeEditor } from "@codesandbox/sandpack-react";

interface DynamicIframeModalProps {
  code: string;
  open?: boolean;
  onClose?: () => void;
}

const DynamicIframeModal: React.FC<DynamicIframeModalProps> = ({ 
  code,
  open: propOpen = true,
  onClose = () => {}
}) => {
  const [open, setOpen] = useState(propOpen);
  const [tabValue, setTabValue] = useState(0);
  const [iframeKey, setIframeKey] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleIframeReload = () => {
    setIframeKey(prevKey => prevKey + 1);
  };

  const handleDownloadHTML = () => {
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'improved-website.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  // Control local state from props
  React.useEffect(() => {
    if (propOpen) {
      setIframeKey((k) => k + 1);
    };
    setOpen(propOpen);
  }, [propOpen]);

  return (
    <Modal 
      open={open} 
      onClose={handleClose}
      aria-labelledby="website-preview-modal"
    >
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
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            borderBottom: 1,
            borderColor: "divider"
          }}
        >
          <Typography variant="h6" component="h2" id="website-preview-modal">
            Website Improvement Preview
          </Typography>
          <IconButton onClick={handleClose} aria-label="close">
            <Close />
          </IconButton>
        </Box>

        {/* Tab Navigation */}
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="preview tabs"
            sx={{
              borderBottom: 1,
              borderColor: 'divider'
            }}
          >
            <Tab 
              icon={<Visibility />} 
              iconPosition="start" 
              label="Preview" 
              id="tab-0"
              aria-controls="tabpanel-0"
            />
            <Tab 
              icon={<Code />} 
              iconPosition="start" 
              label="HTML Code" 
              id="tab-1"
              aria-controls="tabpanel-1"
            />
          </Tabs>
        </Box>

        {/* Preview Content */}
        <Box 
          role="tabpanel"
          hidden={tabValue !== 0}
          id="tabpanel-0"
          aria-labelledby="tab-0"
          sx={{ 
            flexGrow: 1, 
            overflow: 'hidden',
            display: tabValue === 0 ? 'flex' : 'none',
            flexDirection: 'column'
          }}
        >
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={handleIframeReload}
              size="small"
            >
              Reload Preview
            </Button>
          </Box>

          <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 2, pb: 2 }}>
            <Paper 
              elevation={3} 
              sx={{ 
                height: '100%',
                overflow: 'hidden',

                borderRadius: 1
              }}
            >
              <SandpackProvider
                template="static"
                style={{ height: '100%' }}
                files={{
                  "/index.html": { code: code, active: true },
                }}
              >
                <SandpackPreview
                  key={iframeKey}
                  showRefreshButton={false}
                  showOpenInCodeSandbox={false}
                  style={{
                    height: '100%',
                    borderRadius: '4px',
                  }}
                />
              </SandpackProvider>
            </Paper>
          </Box>
        </Box>

        {/* Code Content */}
        <Box
          role="tabpanel"
          hidden={tabValue !== 1}
          id="tabpanel-1"
          aria-labelledby="tab-1"
          sx={{ 
            flexGrow: 1, 
            overflow: 'hidden',
            display: tabValue === 1 ? 'flex' : 'none',
            flexDirection: 'column' 
          }}
        >
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button
              variant="outlined"
              onClick={handleDownloadHTML}
              size="small"
            >
              Download HTML
            </Button>
          </Box>

          <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 2, pb: 2 }}>
            <Paper 
              elevation={3} 
              sx={{ 
                height: '100%',
                overflow: 'hidden', 
                borderRadius: 1
              }}
            >
              <SandpackProvider
                template="static"
                files={{
                  "/index.html": { code: code, active: true },
                }}
                theme="light"
              >
                <SandpackCodeEditor
                  showLineNumbers={true}
                  showInlineErrors={true}
                  wrapContent
                  readOnly
                  style={{
                    height: '100%',
                    fontSize: '14px'
                  }}
                />
              </SandpackProvider>
            </Paper>
          </Box>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            p: 2,
            borderTop: 1,
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="body2" color="text.secondary">
            This HTML has been enhanced using AI based on UX best practices
          </Typography>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DynamicIframeModal;