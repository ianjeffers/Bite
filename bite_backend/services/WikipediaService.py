import wikipedia

class WikipediaService:

    def get_page(self, title):
        if title is None:
            return None
        try:
            return wikipedia.page(self.correct_title(title))
        except (wikipedia.DisambiguationError, wikipedia.PageError):
            return None

    def correct_title(self, title):
        if title is None:
            return None
        suggestion = wikipedia.suggest(title)
        return suggestion if suggestion else title

    def get_summary(self, title):
        if title is None:
            return None
        try:
            return wikipedia.summary(self.correct_title(title))
        except (wikipedia.DisambiguationError, wikipedia.PageError):
            return None
