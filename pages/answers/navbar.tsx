import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const navItems = [
  'Showcase',
  'Docs',
  'Blog',
  'Analytics',
  'Templates',
  'Enterprise',
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(navItems[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const windowWidth = Dimensions.get('window').width;
  const isMobile = windowWidth <= 768;

  return (
    <View style={styles.container}>

      <View style={styles.navbar}>
        <View style={styles.navbarContent}>

          <View style={styles.leftSection}>
            <TouchableOpacity>
              <Text style={styles.siteName}>AEON</Text>
            </TouchableOpacity>

            {!isMobile && (
              <View style={styles.links}>
                {navItems.map((item) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => {
                      setSelectedItem(item);
                      setMenuOpen(false);
                    }}
                  >
                    <Text style={[
                      styles.link,
                      item === selectedItem && styles.selectedLink
                    ]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={styles.rightSection}>
            {(!isMobile || searchOpen) && (
              <TextInput
                style={[
                  styles.searchInput,
                  searchOpen && styles.mobileSearchInput
                ]}
                placeholder="Search documentation..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            )}

            {isMobile && !searchOpen && (
              <TouchableOpacity
                onPress={() => {
                  setSearchOpen(true);
                  setMenuOpen(false);
                }}
                style={styles.iconButton}
              >
                <FontAwesomeIcon icon={faSearch} size={20} />
              </TouchableOpacity>
            )}

            {isMobile && (
              <TouchableOpacity
                onPress={() => {
                  setMenuOpen(!menuOpen);
                  setSearchOpen(false);
                }}
                style={styles.iconButton}
              >
                <FontAwesomeIcon
                  icon={menuOpen ? faTimes : faBars}
                  size={20}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>


      {isMobile && menuOpen && (
        <View style={styles.mobileMenu}>
          {navItems.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.mobileMenuItem}
              onPress={() => {
                setSelectedItem(item);
                setMenuOpen(false);
              }}
            >
              <Text style={[
                styles.mobileLink,
                item === selectedItem && styles.selectedLink
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  navbar: {
    height: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'center',
  },
  navbarContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  siteName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    marginRight: 40,
  },
  links: {
    flexDirection: 'row',
  },
  link: {
    marginRight: 28,
    color: '#818181',
    fontSize: 14,
  },
  selectedLink: {
    color: '#007AFF',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#d2d2d7',
    borderRadius: 6,
    padding: 6,
    fontSize: 14,
    color: '#1d1d1f',
    backgroundColor: '#f5f5f7',
    minWidth: 200,
  },
  mobileSearchInput: {
    width: '100%',
    marginHorizontal: 15,
  },
  iconButton: {
    marginLeft: 16,
  },
  mobileMenu: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  mobileMenuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  mobileLink: {
    color: '#818181',
    fontSize: 14,
  },
});