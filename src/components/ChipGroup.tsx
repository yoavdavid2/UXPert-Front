import React, { useMemo } from "react";
import {
  Box,
  Chip,
  Typography,
  useTheme,
  alpha,
  InputBase,
  IconButton,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";

interface ChipItem {
  name: string;
  icon: React.ReactNode;
  description?: string;
  category?: string;
}

interface ChipGroupProps {
  items: ChipItem[];
  selectedItems: string[];
  toggleItem: (item: string) => void;
  searchable?: boolean;
  groupByCategory?: boolean;
  maxHeight?: string | number;
}

const ChipGroup: React.FC<ChipGroupProps> = ({
  items,
  selectedItems,
  toggleItem,
  searchable = false,
  groupByCategory = false,
  maxHeight = 300,
}) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = React.useState("");

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery) return items;
    const lowerQuery = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerQuery) ||
        item.category?.toLowerCase().includes(lowerQuery)
    );
  }, [items, searchQuery]);

  // Group items by category if needed
  const groupedItems = useMemo(() => {
    if (!groupByCategory) return { "All Items": filteredItems };

    return filteredItems.reduce((acc, item) => {
      const category = item.category || "Other";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {} as Record<string, ChipItem[]>);
  }, [filteredItems, groupByCategory]);

  return (
    <Box>
      {searchable && (
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            mb: 2,
            borderRadius: 2,
          }}
          elevation={0}
          variant="outlined"
        >
          <IconButton sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search options..."
            inputProps={{ "aria-label": "search options" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Paper>
      )}

      <Box
        sx={{
          maxHeight,
          overflowY: "auto",
          pr: 1,
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: alpha(theme.palette.primary.main, 0.2),
            borderRadius: "3px",
          },
        }}
      >
        {Object.entries(groupedItems).map(([category, categoryItems]) => (
          <Box key={category} sx={{ mb: groupByCategory ? 3 : 0 }}>
            {groupByCategory && categoryItems.length > 0 && (
              <Typography
                variant="subtitle2"
                sx={{ mb: 1, color: "text.secondary" }}
              >
                {category}
              </Typography>
            )}

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              {categoryItems.map((item) => {
                const isSelected = selectedItems.includes(item.name);

                return (
                  <motion.div
                    key={item.name}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Chip
                      label={item.name}
                      icon={item.icon}
                      onClick={() => toggleItem(item.name)}
                      clickable
                      color={isSelected ? "primary" : "default"}
                      variant={isSelected ? "filled" : "outlined"}
                      title={item.description || item.name}
                      sx={{
                        "& .MuiChip-icon": {
                          color: isSelected ? "inherit" : "action.active",
                        },
                        position: "relative",
                        transition: theme.transitions.create(
                          [
                            "background-color",
                            "box-shadow",
                            "border-color",
                            "color",
                          ],
                          { duration: theme.transitions.duration.short }
                        ),
                        "&:after": isSelected
                          ? {
                              content: '""',
                              position: "absolute",
                              top: 0,
                              right: 0,
                              width: "8px",
                              height: "8px",
                              backgroundColor: theme.palette.success.main,
                              borderRadius: "50%",
                              transform: "translate(25%, -25%)",
                            }
                          : {},
                      }}
                    />
                  </motion.div>
                );
              })}

              {categoryItems.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                  No items found in this category.
                </Typography>
              )}
            </Box>
          </Box>
        ))}

        {filteredItems.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            No items match your search.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ChipGroup;
