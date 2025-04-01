import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  TextField,
  InputAdornment,
  Paper,
  Alert,
  Collapse,
  CircularProgress,
  Chip,
  IconButton,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Check,
  Error,
  Language,
  Description,
  Help,
  Close,
} from "@mui/icons-material";

interface FinalDataStepProps {
  websitePurpose: string;
  setWebsitePurpose: (purpose: string) => void;
  websiteUrl: string;
  setWebsiteUrl: (url: string) => void;
}

const FinalDataStep: React.FC<FinalDataStepProps> = ({
  websitePurpose,
  setWebsitePurpose,
  websiteUrl,
  setWebsiteUrl,
}) => {
  const theme = useTheme();
  const [urlError, setUrlError] = useState<string | null>(null);
  const [purposeError, setPurposeError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [showTips, setShowTips] = useState(true);

  // Validate URL with a simple pattern
  const validateUrl = (url: string): boolean => {
    if (!url.trim()) {
      setUrlError("URL is required");
      return false;
    }

    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/;
    if (!urlPattern.test(url)) {
      setUrlError("Please enter a valid URL");
      return false;
    }

    setUrlError(null);
    return true;
  };

  // Validate website purpose
  const validatePurpose = (purpose: string): boolean => {
    if (!purpose.trim()) {
      setPurposeError("Please describe your website's purpose");
      return false;
    }

    if (purpose.trim().length < 20) {
      setPurposeError("Please provide more details (at least 20 characters)");
      return false;
    }

    setPurposeError(null);
    return true;
  };

  // Simulate URL validation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (websiteUrl.trim() && !urlError) {
        setIsValidating(true);

        // Simulate async validation
        setTimeout(() => {
          setIsValidating(false);
          validateUrl(websiteUrl);
        }, 800);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [websiteUrl, urlError]);

  // Handle URL changes
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setWebsiteUrl(newUrl);
    if (newUrl.trim()) {
      validateUrl(newUrl);
    } else {
      setUrlError(null);
    }
  };

  // Handle purpose changes
  const handlePurposeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newPurpose = e.target.value;
    setWebsitePurpose(newPurpose);
    if (newPurpose.trim()) {
      validatePurpose(newPurpose);
    } else {
      setPurposeError(null);
    }
  };

  // Calculate purpose character count and display appropriate color
  const purposeLength = websitePurpose.trim().length;
  const getPurposeLengthColor = () => {
    if (purposeLength === 0) return theme.palette.text.disabled;
    if (purposeLength < 20) return theme.palette.error.main;
    if (purposeLength < 50) return theme.palette.warning.main;
    return theme.palette.success.main;
  };

  // Purpose strength indicators
  const getPurposeStrength = () => {
    if (purposeLength === 0) return "Empty";
    if (purposeLength < 20) return "Too brief";
    if (purposeLength < 50) return "Good";
    if (purposeLength < 100) return "Great";
    return "Excellent";
  };

  const purposeStrengthColor = getPurposeLengthColor();
  const purposeStrength = getPurposeStrength();

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Final Details
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        We're almost there! Just need a bit more information to personalize your
        website.
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Collapse in={showTips}>
        <Alert
          severity="info"
          sx={{ mb: 3 }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setShowTips(false)}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
        >
          <Typography variant="body2">
            <strong>Tip:</strong> A clear website purpose helps us generate
            better design recommendations. Be specific about what you want
            visitors to do on your site.
          </Typography>
        </Alert>
      </Collapse>

      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          borderColor: purposeError
            ? theme.palette.error.main
            : theme.palette.divider,
          bgcolor: alpha(theme.palette.background.paper, 0.6),
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Description fontSize="small" />
          What is your website's purpose?
        </Typography>

        <TextField
          fullWidth
          multiline
          minRows={4}
          maxRows={8}
          placeholder="Example: My website will showcase our bakery products and allow customers to place online orders. We want to highlight our specialty cakes and convey our artisanal approach."
          value={websitePurpose}
          onChange={handlePurposeChange}
          error={!!purposeError}
          helperText={purposeError}
          variant="outlined"
          sx={{ mb: 2 }}
          InputProps={{
            sx: {
              bgcolor: "background.paper",
            },
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Chip
            label={purposeStrength}
            size="small"
            sx={{
              bgcolor: alpha(purposeStrengthColor, 0.1),
              color: purposeStrengthColor,
              borderColor: purposeStrengthColor,
            }}
            variant="outlined"
          />

          <Typography variant="caption" color="text.secondary">
            {purposeLength} characters
          </Typography>
        </Box>
      </Paper>

      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          p: 3,
          borderRadius: 2,
          borderColor: urlError
            ? theme.palette.error.main
            : theme.palette.divider,
          bgcolor: alpha(theme.palette.background.paper, 0.6),
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Language fontSize="small" />
          What is your website's URL?
        </Typography>

        <TextField
          fullWidth
          placeholder="example.com"
          variant="outlined"
          value={websiteUrl}
          onChange={handleUrlChange}
          error={!!urlError}
          helperText={urlError}
          InputProps={{
            startAdornment:
              websiteUrl.trim() && !websiteUrl.startsWith("http") ? (
                <InputAdornment position="start">https://</InputAdornment>
              ) : null,
            endAdornment: (
              <InputAdornment position="end">
                {isValidating ? (
                  <CircularProgress size={20} />
                ) : websiteUrl && !urlError ? (
                  <Check color="success" />
                ) : urlError ? (
                  <Error color="error" />
                ) : null}
              </InputAdornment>
            ),
            sx: {
              bgcolor: "background.paper",
            },
          }}
        />

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1, display: "block" }}
        >
          Even if your website doesn't exist yet, enter your planned domain
          name.
        </Typography>
      </Paper>
    </Box>
  );
};

export default FinalDataStep;
