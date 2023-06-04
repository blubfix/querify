 <BottomNavigation
                            style={styles.BottomNavBar}
                            shifting={false}
                            barStyle={{ backgroundColor: "#F5F1F3" }}
                            navigationState={{ index, routes }}
                            onIndexChange={setIndex}
                            renderScene={renderScene}
                            theme={{ colors: { secondaryContainer: '#303030', onSurface: "#303030", onSurfaceVariant: "#303030" } }}

                        />