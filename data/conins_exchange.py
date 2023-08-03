class Solution:
    def coinChange(self, coins: list[int], amount: int) -> int:
        dp = [float('inf')] * (amount + 1)
        dp[0] = 0

        for c in coins:
            for i in range(c, len(dp)):
                dp[i] = min(dp[i], dp[i - c] + 1)
        return dp[amount] if dp[amount] != float('inf') else -1

s = Solution()
res = s.coinChange(coins = [1,2,5], amount = 11)
print(res)