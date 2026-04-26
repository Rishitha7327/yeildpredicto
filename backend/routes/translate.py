# ============================================================
# Yeildpredicto — routes/translate.py
# Translation endpoint using googletrans
# ============================================================

from flask import Blueprint, request, jsonify
import traceback

translate_bp = Blueprint('translate', __name__)

# Try googletrans first, fall back gracefully
try:
    from googletrans import Translator
    _translator = Translator()
    GOOGLETRANS_AVAILABLE = True
except ImportError:
    GOOGLETRANS_AVAILABLE = False
    print("⚠️  googletrans not installed. Run: pip install googletrans==4.0.0-rc1")

# Supported language codes
SUPPORTED_LANGS = {
    'en', 'hi', 'te', 'ta', 'kn', 'ml', 'mr', 'gu',
    'pa', 'bn', 'or', 'as', 'ur', 'sa', 'ne'
}


@translate_bp.route('/utils/translate', methods=['POST'])
def translate_post():
    """
    Translate text to a target language.

    Request body:
        {
            "text": "Hello World",
            "target": "hi",
            "source": "en"   (optional, defaults to 'en')
        }

    Response:
        {
            "status": "success",
            "translated_text": "नमस्ते दुनिया",
            "source": "en",
            "target": "hi"
        }
    """
    try:
        data   = request.get_json()
        text   = data.get('text', '').strip()
        target = data.get('target', 'en').lower()
        source = data.get('source', 'en').lower()

        # Validation
        if not text:
            return jsonify({'status': 'error', 'message': 'No text provided'}), 400

        if target not in SUPPORTED_LANGS:
            return jsonify({'status': 'error', 'message': f'Unsupported target language: {target}'}), 400

        # If source == target, return as-is
        if source == target:
            return jsonify({
                'status':          'success',
                'translated_text': text,
                'source':          source,
                'target':          target
            })

        if not GOOGLETRANS_AVAILABLE:
            return jsonify({
                'status':  'error',
                'message': 'Translation service not available. Install googletrans.'
            }), 503

        result = _translator.translate(text, dest=target, src=source)
        return jsonify({
            'status':          'success',
            'translated_text': result.text,
            'source':          source,
            'target':          target
        })

    except Exception as e:
        traceback.print_exc()
        return jsonify({
            'status':  'error',
            'message': f'Translation failed: {str(e)}'
        }), 500


@translate_bp.route('/translate', methods=['GET'])
def translate_test():
    return {"message": "Translator working!"}


# ✅ FIX: translate_batch was missing its @route decorator — endpoint was unreachable
@translate_bp.route('/utils/translate-batch', methods=['POST'])
def translate_batch():
    """
    Translate multiple texts at once.

    Request body:
        {
            "texts": ["Hello", "World", "Farm"],
            "target": "hi",
            "source": "en"
        }

    Response:
        {
            "status": "success",
            "translations": ["नमस्ते", "दुनिया", "खेत"]
        }
    """
    try:
        data   = request.get_json()
        texts  = data.get('texts', [])
        target = data.get('target', 'en').lower()
        source = data.get('source', 'en').lower()

        if not texts or not isinstance(texts, list):
            return jsonify({'status': 'error', 'message': 'No texts array provided'}), 400

        if target not in SUPPORTED_LANGS:
            return jsonify({'status': 'error', 'message': f'Unsupported language: {target}'}), 400

        if source == target:
            return jsonify({'status': 'success', 'translations': texts})

        if not GOOGLETRANS_AVAILABLE:
            return jsonify({'status': 'error', 'message': 'Translation service unavailable'}), 503

        translations = []
        for text in texts:
            if text and text.strip():
                result = _translator.translate(text.strip(), dest=target, src=source)
                translations.append(result.text)
            else:
                translations.append(text)

        return jsonify({'status': 'success', 'translations': translations})

    except Exception as e:
        traceback.print_exc()
        return jsonify({'status': 'error', 'message': str(e)}), 500
