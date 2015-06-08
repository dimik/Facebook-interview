/**
 * You have N elements. Compare the first two. One of these is 'worse' than the other. Discard it. Compare the 'better' of the two with the next element. Continue this first pass across the list until only one element remains. This step is O(N).
 *
 * The one element that survived the first pass now needs to be compared with every element from the original list except those that it was already compared with. If it 'loses' even once, you return that there is no 'best' element. If it 'wins' every comparison in this step you return this element. This step is also O(N).
 *
 * This algorithm is O(N+N) = O(N) in the worst case and O(N+0) == O(N) in the best case. We can further prove that this is the best possible complexity because checking a solution is also O(N), and it cannot be less complex to get a solution than it is to check it.
 */
