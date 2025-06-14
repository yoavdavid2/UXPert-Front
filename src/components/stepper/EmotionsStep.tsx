import React, { useMemo } from "react";
import {
  Work,
  SentimentSatisfiedAlt,
  LocalFireDepartment,
  Shield,
  Laptop,
  AutoAwesome,
  EmojiEmotions,
  EmojiEvents,
  Gesture,
  Groups,
  Lightbulb,
  Security,
  Spa,
  Explore,
  Psychology,
  FavoriteBorder,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Chip,
  useTheme,
  alpha,
} from "@mui/material";
import ChipGroup from "../ChipGroup";
import { IEmotionsStepProps } from "../../utils/types";

const EmotionsStep = ({
  selectedEmotions,
  toggleEmotion,
}: IEmotionsStepProps) => {
  const theme = useTheme();

  // Emotions organized by category
  const emotionsByCategory = useMemo(
    () => [
      {
        category: "Trust & Security",
        emotions: [
          {
            name: "Professional",
            icon: <Work fontSize="small" />,
            category: "Trust & Security",
            description: "Conveys expertise and competence",
          },
          {
            name: "Safe",
            icon: <Shield fontSize="small" />,
            category: "Trust & Security",
            description: "Makes users feel protected",
          },
          {
            name: "Security & Trust",
            icon: <Security fontSize="small" />,
            category: "Trust & Security",
            description: "Builds confidence in your platform",
          },
        ],
      },
      {
        category: "Positive Emotions",
        emotions: [
          {
            name: "Happy",
            icon: <SentimentSatisfiedAlt fontSize="small" />,
            category: "Positive Emotions",
            description: "Creates a cheerful atmosphere",
          },
          {
            name: "Joy & Fun",
            icon: <EmojiEmotions fontSize="small" />,
            category: "Positive Emotions",
            description: "Delivers entertainment and pleasure",
          },
          {
            name: "Excitement",
            icon: <EmojiEmotions fontSize="small" />,
            category: "Positive Emotions",
            description: "Stimulates enthusiasm",
          },
        ],
      },
      {
        category: "Comfort & Warmth",
        emotions: [
          {
            name: "Cozy",
            icon: <LocalFireDepartment fontSize="small" />,
            category: "Comfort & Warmth",
            description: "Creates a comfortable, homey feeling",
          },
          {
            name: "Warmth",
            icon: <LocalFireDepartment fontSize="small" />,
            category: "Comfort & Warmth",
            description: "Evokes friendliness and approachability",
          },
          {
            name: "Relaxation",
            icon: <Spa fontSize="small" />,
            category: "Comfort & Warmth",
            description: "Helps users feel calm and at ease",
          },
        ],
      },
      {
        category: "Personal Connection",
        emotions: [
          {
            name: "Empathy",
            icon: <FavoriteBorder fontSize="small" />,
            category: "Personal Connection",
            description: "Shows understanding of user needs",
          },
          {
            name: "Community",
            icon: <Groups fontSize="small" />,
            category: "Personal Connection",
            description: "Creates a sense of belonging",
          },
        ],
      },
      {
        category: "Innovation & Uniqueness",
        emotions: [
          {
            name: "Technological",
            icon: <Laptop fontSize="small" />,
            category: "Innovation & Uniqueness",
            description: "Highlights technical capabilities",
          },
          {
            name: "Innovation",
            icon: <Lightbulb fontSize="small" />,
            category: "Innovation & Uniqueness",
            description: "Showcases forward-thinking",
          },
          {
            name: "Uniqueness",
            icon: <AutoAwesome fontSize="small" />,
            category: "Innovation & Uniqueness",
            description: "Emphasizes differentiation",
          },
        ],
      },
      {
        category: "Confidence & Achievement",
        emotions: [
          {
            name: "Proud",
            icon: <EmojiEvents fontSize="small" />,
            category: "Confidence & Achievement",
            description: "Conveys accomplishment",
          },
          {
            name: "Self-confidence",
            icon: <EmojiEvents fontSize="small" />,
            category: "Confidence & Achievement",
            description: "Inspires assurance",
          },
        ],
      },
      {
        category: "Clarity & Structure",
        emotions: [
          {
            name: "Simplicity",
            icon: <Gesture fontSize="small" />,
            category: "Clarity & Structure",
            description: "Makes complex things easy",
          },
          {
            name: "Inspiration",
            icon: <Lightbulb fontSize="small" />,
            category: "Clarity & Structure",
            description: "Motivates creativity",
          },
        ],
      },
      {
        category: "Other Emotions",
        emotions: [
          {
            name: "Anxious",
            icon: <Psychology fontSize="small" />,
            category: "Other Emotions",
            description: "Creates urgency or anticipation",
          },
          {
            name: "Curious",
            icon: <Explore fontSize="small" />,
            category: "Other Emotions",
            description: "Encourages exploration",
          },
        ],
      },
    ],
    []
  );

  // Flatten emotions for the ChipGroup
  const allEmotions = useMemo(() => {
    return emotionsByCategory.flatMap((category) => category.emotions);
  }, [emotionsByCategory]);

  // Create a color map for emotion categories
  const getCategoryColor = (category: string) => {
    const categoryColors: Record<string, string> = {
      "Trust & Security": theme.palette.info.main,
      "Positive Emotions": theme.palette.success.main,
      "Comfort & Warmth": theme.palette.warning.main,
      "Personal Connection": theme.palette.error.main,
      "Innovation & Uniqueness": theme.palette.primary.main,
      "Confidence & Achievement": theme.palette.secondary.main,
      "Clarity & Structure": theme.palette.info.light,
      "Other Emotions": theme.palette.grey[500],
    };

    return categoryColors[category] || theme.palette.grey[500];
  };

  return (
    <Box>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Select the emotions you want your visitors to feel when they visit your
        website.
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="body2" color="text.secondary">
          Your selected emotions will guide the color scheme, typography, and
          overall design style of your website.
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Emotion mood board - visualization of selected emotions */}
      {selectedEmotions.length > 0 && (
        <Box
          sx={{
            mb: 4,
            p: 2,
            borderRadius: 2,
            background: theme.palette.background.paper,
            boxShadow: `0 0 10px ${alpha(theme.palette.primary.main, 0.1)}`,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          }}
        >
          <Typography variant="subtitle1" gutterBottom>
            Your Emotion Palette
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {selectedEmotions.map((emotion) => {
              const emotionData = allEmotions.find((e) => e.name === emotion);
              const categoryColor = getCategoryColor(
                emotionData?.category || "Other Emotions"
              );

              return (
                <Chip
                  key={emotion}
                  label={emotion}
                  icon={emotionData?.icon}
                  color="primary"
                  variant="filled"
                  onDelete={() => toggleEmotion(emotion)}
                  sx={{
                    bgcolor: alpha(categoryColor, 0.8),
                    "&:hover": {
                      bgcolor: alpha(categoryColor, 0.9),
                    },
                  }}
                />
              );
            })}
          </Box>
        </Box>
      )}

      <ChipGroup
        items={allEmotions}
        selectedItems={selectedEmotions}
        toggleItem={toggleEmotion}
        searchable={true}
        groupByCategory={true}
        maxHeight={400}
      />
    </Box>
  );
};

export default EmotionsStep;
