# services/WikipediaService.py
import wikipedia

class WikipediaService:

    def get_page(self, title):
        if title is None:
            return None
        return wikipedia.page(self.correct_title(title))

    def correct_title(self, title):
        suggestion = wikipedia.suggest(title)
        return suggestion if suggestion else title

    def get_summary(self, title):
        if title is None:
            return None
        return wikipedia.summary(self.correct_title(title))
