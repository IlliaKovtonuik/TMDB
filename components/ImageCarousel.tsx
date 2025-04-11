import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { ImageData } from "@/types/movie";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface ImageCarouselProps {
  images: ImageData[];
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  return (
    <View style={styles.wrapper}>
      <Carousel
        loop
        width={SCREEN_WIDTH * 0.95}
        height={250}
        autoPlay={true}
        autoPlayInterval={3000}
        data={images}
        scrollAnimationDuration={800}
        mode="horizontal-stack"
        modeConfig={{
          snapDirection: "left",
          stackInterval: 20,
          showLength: 3,
        }}
        customConfig={() => ({ type: "positive", viewCount: 5 })}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w780${item.file_path}`,
              }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
