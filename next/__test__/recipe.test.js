const API_URL = 'http://142.132.226.214:3010/recipes/get';

async function fetchRecipes(ingredients) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients }),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
}

describe('API Fetch', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('recipe shows up', async () => {
        const mockResponse = [
            {
                description: {
                    name: 'Recipe 1',
                    ingredients: ['ingredient 1', 'ingredient 2'],
                    difficulty: 'easy',
                    time: '30 mins'
                },
                img_url: 'http://example.com/image1.jpg'
            },
            {
                description: {
                    name: 'Recipe 2',
                    ingredients: ['ingredient 3', 'ingredient 4'],
                    difficulty: 'medium',
                    time: '45 mins'
                },
                img_url: 'http://example.com/image2.jpg'
            }
        ];

        fetch.mockResponseOnce(JSON.stringify(mockResponse));

        const ingredients = ["hackfleisch", "nudeln", "reis", "käse", "tomate", "tomaten"];
        const data = await fetchRecipes(ingredients);

        expect(data).toEqual(mockResponse);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ingredients }),
        });
    });
});
