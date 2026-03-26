import os
import sys

# Mocking the environment logic from api/index.py
def get_webhook(vercel_env, prod_url=None, test_url=None, fallback_url=None):
    if vercel_env == "production":
        return prod_url or fallback_url
    else:
        return test_url or fallback_url

# Test cases
tests = [
    {
        "name": "Production environment with prod URL",
        "env": "production",
        "prod": "http://prod",
        "test": "http://test",
        "fallback": "http://fallback",
        "expected": "http://prod"
    },
    {
        "name": "Production environment without prod URL, with fallback",
        "env": "production",
        "prod": None,
        "test": "http://test",
        "fallback": "http://fallback",
        "expected": "http://fallback"
    },
    {
        "name": "Development environment with test URL",
        "env": "development",
        "prod": "http://prod",
        "test": "http://test",
        "fallback": "http://fallback",
        "expected": "http://test"
    },
    {
        "name": "Preview environment with test URL",
        "env": "preview",
        "prod": "http://prod",
        "test": "http://test",
        "fallback": "http://fallback",
        "expected": "http://test"
    },
    {
        "name": "Development environment without test URL, with fallback",
        "env": "development",
        "prod": "http://prod",
        "test": None,
        "fallback": "http://fallback",
        "expected": "http://fallback"
    }
]

failed = 0
for t in tests:
    result = get_webhook(t["env"], t["prod"], t["test"], t["fallback"])
    if result == t["expected"]:
        print(f"✅ PASS: {t['name']}")
    else:
        print(f"❌ FAIL: {t['name']} (Expected {t['expected']}, got {result})")
        failed += 1

if failed == 0:
    print("\nAll logic tests passed! ✨")
    sys.exit(0)
else:
    print(f"\n{failed} tests failed. ❌")
    sys.exit(1)
