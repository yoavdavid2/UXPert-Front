import { Box, Typography, Divider, Grid, Chip } from "@mui/material";
import {
  Code,
  BubbleChart,
  Forum,
  Restaurant,
  AccountBalance,
  BusinessCenter,
  DirectionsCar,
  Computer,
  ShowChart,
  Security,
  Person,
  ChildCare,
  Elderly,
  School,
  People,
  Work,
  Cake,
  Brush,
  Business,
  Checkroom,
  CodeSharp,
  Create,
  Deck,
  Engineering,
  Group,
  HealthAndSafety,
  Lightbulb,
  LocalHospital,
  MenuBook,
  Movie,
  MusicNote,
  Newspaper,
  Palette,
  PhotoLibrary,
  Public,
  Science,
  ShoppingCart,
  SportsBasketball,
  SportsEsports,
  CreditCard,
} from "@mui/icons-material";
import ChipGroup from "../ChipGroup";

const TargetsStep = ({
  selectedCategories,
  toggleCategory,
  selectedAudience,
  toggleAudience,
}) => {
  const categories = [
    { name: "Programming", icon: <Code fontSize="small" /> },
    { name: "Social Media", icon: <BubbleChart fontSize="small" /> },
    { name: "Forum", icon: <Forum fontSize="small" /> },
    { name: "Cooking", icon: <Restaurant fontSize="small" /> },
    { name: "Bank", icon: <AccountBalance fontSize="small" /> },
    { name: "Government", icon: <BusinessCenter fontSize="small" /> },
    { name: "Cars", icon: <DirectionsCar fontSize="small" /> },
    { name: "Tech", icon: <Computer fontSize="small" /> },
    { name: "Stocks", icon: <ShowChart fontSize="small" /> },
    { name: "Cyber-Security", icon: <Security fontSize="small" /> },
    {
      name: "Commercial/Online Store",
      icon: <ShoppingCart fontSize="small" />,
    },
    { name: "Corporate Brand", icon: <Business fontSize="small" /> },
    { name: "Blog/Personal Content", icon: <Create fontSize="small" /> },
    { name: "News Portal", icon: <Newspaper fontSize="small" /> },
    {
      name: "Professional Services",
      icon: <BusinessCenter fontSize="small" />,
    },
    { name: "Portfolio", icon: <PhotoLibrary fontSize="small" /> },
    { name: "Community/Social Network", icon: <Group fontSize="small" /> },
    { name: "Educational", icon: <School fontSize="small" /> },
    { name: "Entertainment/Gaming", icon: <SportsEsports fontSize="small" /> },
    { name: "Leisure/Gossip", icon: <Deck fontSize="small" /> },
    { name: "Technology/Startup", icon: <Lightbulb fontSize="small" /> },
  ];

  const audiences = [
    { name: "Adults", icon: <Person fontSize="small" /> },
    { name: "Children", icon: <ChildCare fontSize="small" /> },
    { name: "Elderly", icon: <Elderly fontSize="small" /> },
    { name: "Teens", icon: <School fontSize="small" /> },
    { name: "Technological People", icon: <Computer fontSize="small" /> },
    { name: "Non-Technological People", icon: <People fontSize="small" /> },
    { name: "Business associates", icon: <Work fontSize="small" /> },
    { name: "Programmers", icon: <Code fontSize="small" /> },
    { name: "Bakers", icon: <Cake fontSize="small" /> },
    { name: "Professional/Business", icon: <Business fontSize="small" /> },
    { name: "Consumer audience", icon: <ShoppingCart fontSize="small" /> },
    { name: "Students", icon: <School fontSize="small" /> },
    { name: "Families", icon: <People fontSize="small" /> },
    { name: "Seniors", icon: <Elderly fontSize="small" /> },
    { name: "Tech Enthusiasts", icon: <Computer fontSize="small" /> },
    { name: "Diverse Audience", icon: <Public fontSize="small" /> },
    { name: "Regional Audience", icon: <Public fontSize="small" /> },
    // Specialized professionals
    { name: "Legal Professionals", icon: <Business fontSize="small" /> },
    { name: "Medical Professionals", icon: <LocalHospital fontSize="small" /> },
    {
      name: "Engineering Professionals",
      icon: <Engineering fontSize="small" />,
    },
    { name: "Financial Professionals", icon: <CreditCard fontSize="small" /> },
    { name: "IT Specialists", icon: <CodeSharp fontSize="small" /> },
    { name: "Creative Professionals", icon: <Brush fontSize="small" /> },
    { name: "Academic Professionals", icon: <School fontSize="small" /> },
    { name: "Scientific Professionals", icon: <Science fontSize="small" /> },
    { name: "Educators", icon: <MenuBook fontSize="small" /> },
    {
      name: "Social Media Professionals",
      icon: <BubbleChart fontSize="small" />,
    },
    {
      name: "Fitness Professionals",
      icon: <SportsBasketball fontSize="small" />,
    },
    { name: "Culinary Professionals", icon: <Restaurant fontSize="small" /> },
    { name: "Government Employees", icon: <AccountBalance fontSize="small" /> },
    // Interest-based audiences
    { name: "Sports Enthusiasts", icon: <SportsBasketball fontSize="small" /> },
    { name: "Music Lovers", icon: <MusicNote fontSize="small" /> },
    { name: "Fashion Enthusiasts", icon: <Checkroom fontSize="small" /> },
    { name: "Health Conscious", icon: <HealthAndSafety fontSize="small" /> },
    { name: "Design Enthusiasts", icon: <Palette fontSize="small" /> },
    { name: "Art Lovers", icon: <Brush fontSize="small" /> },
    { name: "News Followers", icon: <Newspaper fontSize="small" /> },
    { name: "Travel Enthusiasts", icon: <Public fontSize="small" /> },
    { name: "Food Enthusiasts", icon: <Restaurant fontSize="small" /> },
    { name: "Gamers", icon: <SportsEsports fontSize="small" /> },
    { name: "Literature Fans", icon: <MenuBook fontSize="small" /> },
    { name: "Film & TV Fans", icon: <Movie fontSize="small" /> },
  ];

  return (
    <Box sx={{ maxHeight: "98%%", overflow: "auto", pr: 1 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Answer Couple of our questions
      </Typography>
      <Divider sx={{ mb: 3 }} variant="fullWidth" />
      <Grid container spacing={2} sx={{ display: "flex", flexWrap: "nowrap" }}>
        <Grid item xs={6}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            What is your website's category?
          </Typography>
          <ChipGroup
            items={categories}
            selectedItems={selectedCategories}
            toggleItem={toggleCategory}
          />
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={6}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Who's is your target audience?
          </Typography>
          <ChipGroup
            items={audiences}
            selectedItems={selectedAudience}
            toggleItem={toggleAudience}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TargetsStep;
