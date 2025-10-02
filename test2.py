def Harvest_season(yields,n):
    best_sum = float('-inf')
    best_len = 0
    current_sum, current_len = 0, 0
    for y in yields:
        current_sum += y
        current_len += 1
        if current_sum > best_sum or (current_sum == best_sum and current_len > best_len):
            best_sum = current_sum
            best_len = current_len
        if current_sum < 0:
            current_sum, current_len = 0, 0
    return best_len

if __name__ == "__main__":
    n = int(input())
    yields = list(map(int, input().split()))
    print(Harvest_season(yields, n))