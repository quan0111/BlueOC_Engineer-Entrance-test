def search_in_array(arr, target):
    """
    Determines whether a given integer appears in the array.
    Uses binary search since the array is sorted in non-decreasing order.

    Args:
        arr (list[int]): Sorted array of integers
        target (int): The integer to search for

    Returns:
        str: "YES" if target exists, "NO" otherwise
    """
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return "YES"
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return "NO"


# ----------------------------
# Manual test cases
# ----------------------------
if __name__ == "__main__":
    print(search_in_array([1, 3, 5, 7, 9], 5))   # YES
    print(search_in_array([1, 3, 5, 7, 9], 4))   # NO
    print(search_in_array([2, 2, 2, 2, 2], 2))   # YES
    print(search_in_array([], 1))                # NO
    print(search_in_array([10], 10))             # YES
    print(search_in_array([10], 5))              # NO
    print(search_in_array([-5, -2, 0, 3, 8], -2))# YES

    # ----------------------------
    # Optional unit test section
    # ----------------------------
    import unittest

    class TestSearchInArray(unittest.TestCase):
        def test_found(self):
            self.assertEqual(search_in_array([1, 3, 5, 7, 9], 5), "YES")
        
        def test_not_found(self):
            self.assertEqual(search_in_array([1, 3, 5, 7, 9], 4), "NO")
        
        def test_duplicates(self):
            self.assertEqual(search_in_array([2, 2, 2, 2, 2], 2), "YES")
        
        def test_empty_array(self):
            self.assertEqual(search_in_array([], 1), "NO")
        
        def test_single_element(self):
            self.assertEqual(search_in_array([10], 10), "YES")
            self.assertEqual(search_in_array([10], 5), "NO")
        
        def test_negative_numbers(self):
            self.assertEqual(search_in_array([-5, -2, 0, 3, 8], -2), "YES")

    # Run unit tests
    unittest.main(argv=[''], exit=False)
